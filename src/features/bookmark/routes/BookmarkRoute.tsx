// Third party
import { useEffect, useState } from "react";
// Context
import { useDataContext } from "@/providers/context/DataContext";
// Components
import { Category } from "@/features/shared/components/category/Category";
import { SearchBar } from "@/components/ui/searchbar";
// Utility
import { useDebounce } from "@/hooks/useDebounce";
// Types
import { Data } from "@/providers/context/DataContext";
// Styles
import styles from "./BookmarkRoute.module.css";

export function BookmarkRoute() {
  const { categoryMap, data } = useDataContext();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Data[]>(() =>
    data.filter((item) => item.isBookmarked)
  );

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data]);

  const debouncedCallback = useDebounce(() => {
    setFilteredData(
      data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);

    debouncedCallback();
  };

  return (
    <>
      <SearchBar
        placeholder="Search for bookmarked movies and TV series..."
        onChange={handleSearch}
      ></SearchBar>
      <h1 className={styles.h1}>Bookmarks</h1>
      <Category data={filteredData} categoryMap={categoryMap}></Category>
    </>
  );
}
