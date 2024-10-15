"use client";
import { useState } from "react";
import { Nav } from "./_components/nav";
import SearchForm from "./_components/SearchForm";

export function ClientSideWrapper() {
  const [query, setQuery] = useState(""); // State for query

  return (
    <div className="client-side-wrapper">
      <SearchForm query={query} setQuery={setQuery} />
      <Nav />
    </div>
  );
}
