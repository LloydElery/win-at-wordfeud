"use client";
import { useState } from "react";
import { useSearch } from "../hooks/useSearch";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const { results, search, sortBy, setSortBy } = useSearch();
  console.log("results: ", results);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  const handleSortChange = (event: { target: { value: string } }) => {
    setSortBy(event.target.value as "length" | "value");
    console.log(sortBy);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="switch">
          <input
            type="checkbox"
            checked={sortBy === "length"}
            onChange={(e) =>
              handleSortChange({
                target: { value: e.target.checked ? "length" : "value" },
              })
            }
          />
          <span className="slider">Sorterar efter</span>
          <span className="label-text">
            <strong>{sortBy === "length" ? "värde" : "längd"}</strong>
          </span>
        </label>
        <input
          className="text-black"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          placeholder="SÖK ORD"
        />

        <button type="submit">Sök</button>
      </form>

      <ul>
        {results.map((word, index) => (
          <li key={index}>
            {word.word.toUpperCase()} : {word.value} poäng
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchForm;
