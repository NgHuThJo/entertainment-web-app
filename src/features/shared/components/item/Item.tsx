// Third party
import { useParams } from "react-router-dom";
// Context
import { useDataContext } from "@/providers/context/DataContext";
// Styles
import styles from "./Item.module.css";
// Assets
import video from "./1106651_trees_pines_4k_import60e0167b4c3a9614254367720p5000br.mp4";

export function Item() {
  const { data } = useDataContext();
  const { item } = useParams();

  const filteredData = data.filter((dataItem) => dataItem.title === item);

  return (
    <div className={styles.container}>
      <video className={styles.video} src={video} controls />
      <ul>
        {filteredData.map((item, index) => (
          <li className={styles.grid} key={index}>
            <p>Title:</p>
            <p>{item.title}</p>
            <p>Year:</p>
            <p>{item.year}</p>
            <p>Category:</p>
            <p>{item.category}</p>
            <p>Rating:</p>
            <p>{item.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
