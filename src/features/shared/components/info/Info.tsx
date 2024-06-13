// Components
import { Image } from "@/components/ui/image";
// Types
import { Data } from "@/providers/context/DataContext";
// Styles
import styles from "./Info.module.css";

type Info = React.ComponentPropsWithoutRef<"div"> & {
  item: Data;
  categoryMap: Record<string, string>;
};

export function Info({ item, categoryMap }: Info) {
  return (
    <div className={styles.info}>
      <div data-info-row>
        <span>{item.year}</span>
        <span className={styles.middot}></span>
        <Image className="inline" src={categoryMap[item.category]}></Image>
        <span>{item.category}</span>
        <span className={styles.middot}></span>
        <span>{item.rating}</span>
      </div>
      <h2>{item.title}</h2>
    </div>
  );
}
