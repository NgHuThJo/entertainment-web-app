// Third party
import { Link } from "react-router-dom";
// Context
import { useBreakpointContext } from "@/providers/context/BreakpointContext";
import { useDataContext } from "@/providers/context/DataContext";
import { useDataDispatchContext } from "@/providers/context/DataContext";
// Custom hooks
import { useSwipeX } from "@/hooks/useSwipeX";
// Components
import { Image } from "@/components/ui/image";
import { Info } from "@/features/shared/components/info/Info";
// Types
import { Data } from "@/providers/context/DataContext";
// Styles
import styles from "./Trending.module.css";
// Assets
import {
  icon_bookmark_empty,
  icon_bookmark_full,
  icon_play,
} from "@/assets/images/icons";

export function Trending() {
  const { m } = useBreakpointContext();
  const { data, categoryMap } = useDataContext();
  const { setData } = useDataDispatchContext();
  const { containerRef } = useSwipeX();

  const handleBookmark = (item: Data) => {
    setData((prev) =>
      prev.map((element) => {
        if (element.title === item.title) {
          return {
            ...element,
            isBookmarked:
              element.isBookmarked !== undefined ? !element.isBookmarked : true,
          };
        }

        return element;
      })
    );
  };

  return (
    <>
      <ul
        className={styles.slider}
        ref={containerRef as React.RefObject<HTMLUListElement>}
      >
        {data
          ?.filter((item) => item.isTrending)
          .map((item, index) => (
            <li className="grid-stack" key={index} data-list-item>
              <Image
                className="cover"
                srcSet={`${item.thumbnail.trending?.small} 480w, ${item.thumbnail.trending?.large} 940w`}
                sizes={`(max-width: ${m}) 480px, 940px`}
                alt={`${item.title} thumbnail`}
                src={item.thumbnail.trending?.large}
                data-background-image
              ></Image>
              <div className={styles.overlay}>
                <button onClick={() => handleBookmark(item)} data-bookmark>
                  <Image
                    className="bookmark"
                    src={
                      item.isBookmarked
                        ? icon_bookmark_full
                        : icon_bookmark_empty
                    }
                  ></Image>
                </button>
                <Link to={`/${item.title}`} className={styles.play} data-play>
                  <Image src={icon_play}></Image>
                </Link>
                <Info item={item} categoryMap={categoryMap}></Info>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
