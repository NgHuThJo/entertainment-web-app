// Third party
import { useEffect, useRef } from "react";
// Utility
import { animate, nthPower, makeEaseOut } from "@/utils/animate";

type PointerCoordsX = {
  startX: number;
  scrollLeft: number;
};

export function useSwipeX() {
  const containerRef = useRef<HTMLElement>();
  const animationFrameId = useRef<() => void>();
  const isDragging = useRef(false);
  const isThrottled = useRef(false);
  const lastDelta = useRef(0);
  const distanceMovedBeforePointerRelease = useRef(0);
  const pointerCoords = useRef<PointerCoordsX>({
    startX: 0,
    scrollLeft: 0,
  });
  const deltaMultiplier = 1.5;
  const animationThreshold = 50;
  const distanceMovedThreshold = 50;

  const handlePointerMove = (event: PointerEvent) => {
    if (!isDragging.current || !containerRef.current) {
      return;
    }

    if (!isThrottled.current) {
      isThrottled.current = true;

      requestAnimationFrame(() => {
        const container = containerRef.current;

        if (!container) {
          return;
        }

        const currentX = event.pageX - container.offsetLeft;
        lastDelta.current = currentX - pointerCoords.current.startX;
        container.scrollLeft =
          pointerCoords.current.scrollLeft -
          lastDelta.current * deltaMultiplier;
        distanceMovedBeforePointerRelease.current += Math.abs(
          lastDelta.current
        );

        isThrottled.current = false;
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container === undefined) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (animationFrameId.current) {
        animationFrameId.current();
      }

      event.preventDefault();

      const startX = event.pageX - container.offsetLeft;
      const scrollLeft = container.scrollLeft;
      pointerCoords.current = { startX, scrollLeft };

      isDragging.current = true;
      container.setAttribute("data-pointer-down", "");
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      container.removeAttribute("data-pointer-down");

      if (distanceMovedBeforePointerRelease.current < distanceMovedThreshold) {
        distanceMovedBeforePointerRelease.current = 0;
        return;
      }

      distanceMovedBeforePointerRelease.current = 0;
      const start = container.scrollLeft;

      animationFrameId.current = animate({
        duration: 500,
        timing: makeEaseOut(nthPower.bind(null, 3)),
        draw: (progress: number) => {
          container.scrollLeft =
            start +
            progress * animationThreshold * (lastDelta.current < 0 ? 1 : -1);
        },
      });
    };

    const handlePointerCancel = () => {
      isDragging.current = false;
      container.removeAttribute("data-pointer-down");
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [containerRef]);

  return { containerRef };
}
