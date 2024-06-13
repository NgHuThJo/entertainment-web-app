// Third party
import { useState } from "react";
// Context
import { useDataContext } from "@/providers/context/DataContext";
// Components
import { Category } from "../../shared/components/category/Category";
import { SearchBar } from "@/components/ui/searchbar";
// Utility
import { useDebounce } from "@/hooks/useDebounce";
// Styles
import styles from "./MovieRoute.module.css";

export function MovieRoute() {
  const { categoryMap, data } = useDataContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const debouncedCallback = useDebounce(() => {
    setDebouncedSearchQuery(searchQuery);
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);

    debouncedCallback();
  };

  const filteredData = data
    .filter((item) => item.category === "Movie")
    .filter((item) =>
      item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

  return (
    <>
      <SearchBar
        placeholder="Search for movies..."
        onChange={handleSearch}
      ></SearchBar>
      <h1 className={styles.h1}>Movies</h1>
      <Category data={filteredData} categoryMap={categoryMap}></Category>
    </>
  );
}
