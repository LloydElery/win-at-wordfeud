"use client";
import { useState } from "react";
import { useSearch } from "../hooks/useSearch";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const { results, search } = useSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

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
        <ul>
          {results.map((word, index) => (
            <li key={index}>{word.toUpperCase()}</li>
          ))}
        </ul>
      </form>
    </>
  );
};

export default SearchForm;
