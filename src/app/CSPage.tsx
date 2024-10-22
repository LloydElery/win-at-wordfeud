"use client";
import { useState } from "react";
import { Nav } from "./_components/nav";
import SearchForm from "./_components/SearchForm";
import { AdminProvider } from "./context/AdminContext";

export function ClientSideWrapper() {
  const [query, setQuery] = useState(""); // State for query

  return (
    <div className="client-side-wrapper">
      <AdminProvider>
        <SearchForm query={query} setQuery={setQuery} />
      </AdminProvider>
      <Nav />
    </div>
  );
}
