import { useState } from "react";

export const useSearch = () => {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?letters=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      setResults(data.words || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };
  return { results, loading, search };
};
