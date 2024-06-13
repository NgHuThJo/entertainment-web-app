// Third party
import { Link } from "react-router-dom";
// Context
import { useBreakpointContext } from "@/providers/context/BreakpointContext";
import { useDataDispatchContext } from "@/providers/context/DataContext";
// Components
import { Image } from "@/components/ui/image";
import { Info } from "../info/Info";
// Types
import { Data } from "@/providers/context/DataContext";
import { DataContext } from "@/providers/context/DataContext";
// Styles
import styles from "./Category.module.css";
// Assets
import {
  icon_bookmark_empty,
  icon_bookmark_full,
  icon_play,
} from "@/assets/images/icons";

export function Category({ data, categoryMap }: DataContext) {
  const { m, l } = useBreakpointContext();
  const { setData } = useDataDispatchContext();

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
    <ul className={styles.recommendation}>
      {data.map((item, index) => (
        <li className="flow-spacing" key={index} data-list-item>
          <div className="grid-stack">
            <Image
              className="cover"
              src={item.thumbnail.regular.medium}
              srcSet={`${item.thumbnail.regular.small} 328w, ${item.thumbnail.regular.medium} 441w, ${item.thumbnail.regular.large} 560w`}
              sizes={`(max-width: ${m}) 328px, (max-width: ${l}) 440px, 560px`}
              data-background-image
            ></Image>
            <div className={styles.overlay}>
              <button
                onClick={() => handleBookmark(item)}
                aria-label="bookmark"
                data-bookmark
              >
                <Image
                  className="bookmark"
                  src={
                    item.isBookmarked ? icon_bookmark_full : icon_bookmark_empty
                  }
                ></Image>
              </button>
              <Link
                to={`/${item.title}`}
                className={styles.play}
                aria-label="play video"
                data-play
              >
                <Image src={icon_play}></Image>
              </Link>
            </div>
          </div>
          <Info item={item} categoryMap={categoryMap}></Info>
        </li>
      ))}
    </ul>
  );
}
