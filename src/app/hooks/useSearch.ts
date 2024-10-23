import { useMemo, useState } from "react";
import { fetchCommunityWordsFromDatabase } from "../_components/userPage/services";
import { ICommunityWords } from "../_components/userPage/CommunityWords";

export interface Word {
  id: number;
  word: string;
  value: number;
  reports: number;
  source?: string;
}

export function sortByValueDesc(results: Word[]): Word[] {
  return [...results].sort((a, b) => {
    return b.value - a.value;
  });
}

export const useSearch = () => {
  const [results, setResults] = useState<Word[]>([]);
  const [communityResults, setCommunityResults] = useState<ICommunityWords[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [sortByValue, setSortByValue] = useState(false);
  const [addCommunityWords, setAddCommunityWords] = useState(false);

  const search = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?letters=${encodeURIComponent(query)}`,
      );
      const data = await response.json();

      const communityWordsResponse =
        (await fetchCommunityWordsFromDatabase()).communityWords || [];
      const normalizedCommunityWordsResults = communityWordsResponse.map(
        (cw: ICommunityWords) => ({
          ...cw,
          source: "cw",
        }),
      );

      setResults(data.words || []);
      setCommunityResults(normalizedCommunityWordsResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const combinedResults = addCommunityWords
    ? [...results, ...communityResults]
    : results;

  /*   const sortedResults = useMemo(() => {
    if (sortByValue) {
      return sortByValueDesc(combinedResults);
    }
    return results;
  }, [results, sortByValue]);
 */
  const sortedResults = useMemo(() => {
    if (sortByValue) {
      return [...combinedResults].sort((a, b) => b.value - a.value);
    }
    return combinedResults;
  }, [combinedResults, sortByValue]);

  return {
    results: sortedResults,
    setResults,
    loading,
    search,
    sortByValue,
    setSortByValue,
    addCommunityWords,
    setAddCommunityWords,
  };
};
