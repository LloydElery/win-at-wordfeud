import { useState } from "react";
import { Word } from "../utils/WordInterface";

export const useSearch = () => {
  const [results, setResults] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"length" | "value">("length");

  const search = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?letters=${encodeURIComponent(query)}&sortBy=${sortBy}`,
      );
      const data = await response.json();
      setResults(data.words || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, search, sortBy, setSortBy };
};
