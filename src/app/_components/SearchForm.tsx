"use client";
import { useState } from "react";
import { useSearch } from "../hooks/useSearch";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const { results, search, sortByValue, setSortByValue } = useSearch();
  console.log("results: ", results);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  const handleSortToggle = () => {
    setSortByValue(!sortByValue);
  };

  /* const handleSortChange = (event: { target: { value: string } }) => {
    setSortBy(event.target.value as "length" | "value");
    console.log(sortBy);
  }; */

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="text-black"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          placeholder="SÖK ORD"
        />
        <button type="submit">Sök</button>
      </form>

      <label>
        Sortera efter poäng
        <input
          type="checkbox"
          checked={sortByValue}
          onChange={handleSortToggle}
        />
      </label>

      <ul>
        {results.map((word, index) => (
          <li key={index}>
            {word.word.toUpperCase()} - {word.value}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchForm;
