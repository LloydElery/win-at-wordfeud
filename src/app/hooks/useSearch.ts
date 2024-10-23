import { useMemo, useState } from "react";
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

  const cwSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?letters=${encodeURIComponent(query)}&table=${"community_words"}`,
      );
      const data = await response.json();
      const communityWordsWithSource = data.words.map(
        (cw: ICommunityWords) => ({
          ...cw,
          source: "cw",
        }),
      );
      setCommunityResults(communityWordsWithSource);
    } catch (error) {
      console.error("Error fetching community words:", error);
      setCommunityResults([]);
      setLoading(false);
    }
  };

  const search = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?letters=${encodeURIComponent(query)}&table=${"words"}`,
      );
      const data = await response.json();
      setResults(data.words || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const combinedResults = addCommunityWords
    ? [...results, ...communityResults]
    : results;

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
    cwSearch,
    sortByValue,
    setSortByValue,
    addCommunityWords,
    setAddCommunityWords,
  };
};
