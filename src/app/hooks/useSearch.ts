import { useMemo, useState } from "react";

export interface Word {
  id: number;
  word: string;
  value: number;
  reports: number;
}

export function sortByValueDesc(results: Word[]): Word[] {
  return [...results].sort((a, b) => {
    return b.value - a.value;
  });
}

export const useSearch = () => {
  const [results, setResults] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortByValue, setSortByValue] = useState(false);

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

  const sortedResults = useMemo(() => {
    if (sortByValue) {
      return sortByValueDesc(results);
    }
    return results;
  }, [results, sortByValue]);

  return {
    results: sortedResults,
    setResults,
    loading,
    search,
    sortByValue,
    setSortByValue,
  };
};
