"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CircleIcon from "../_ui/CircleIcon";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { format } from "date-fns";

export interface ICommunityWords {
  id?: number;
  up_votes: number;
  down_votes: number;
  score: number;
  word: string;
  created_at: Date;
  status?: string;
}

const CommunityWords: React.FC = () => {
  const { user } = useUser();
  const [communityWords, setCommunityWords] = useState<ICommunityWords[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState<"score" | "date">("date");

  const observeRef = useRef<HTMLDivElement | null>(null);

  const fetchCommunityWords = async (page: number) => {
    try {
      setLoadingMessage("Hämtar ord och röster från databasen...");

      const response = await fetch(
        `/api/community-words?page=${page}&limit=20`,
      );

      if (!response.ok) throw new Error("Failed to fetch community words");

      const data = await response.json();
      setCommunityWords((prev) => {
        const uniqueWords = data.communityWords.filter(
          (newWord: { id: number | undefined }) =>
            !prev.some((word) => word.id === newWord.id),
        );

        const updatedCommunityWords = [...prev, ...uniqueWords];

        return updatedCommunityWords.length !== prev.length
          ? updatedCommunityWords
          : prev;
      });

      setLoadingMessage(null);
    } catch (error) {
      console.error("Error fetching community words", error);
      setLoadingMessage(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchCommunityWords(page);
  }, [user, page]);

  const sortedResults = [...communityWords].sort((a, b) => {
    let sorted =
      sortMethod === "score"
        ? b.score - a.score
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return sorted;
  });

  const handleVote = async (
    wordId: number,
    voteType: "upVote" | "downVote",
  ) => {
    try {
      setLoadingMessage("Lägger till din röst...");
      const response = await fetch("/api/community-words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wordId,
          voteType,
        }),
      });

      if (!response.ok) throw new Error("Failed to update vote");

      const updatedWord = await response.json();
      console.log("Uppdaterad orddata efter röstning: ", updatedWord);

      setCommunityWords((prevWords) =>
        prevWords.map((word) =>
          word.id === wordId ? { ...word, ...updatedWord } : word,
        ),
      );

      fetchCommunityWords(page);
    } catch (error) {
      console.error("Error voting", error);
      setLoadingMessage(null);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    },
    { threshold: 1.0 },
  );

  useEffect(() => {
    if (observeRef.current) observer.unobserve(observeRef.current);
    return () => {
      if (observeRef.current) observer.unobserve(observeRef.current);
    };
  }, []);

  /*   const updateScoreOnVote = (wordId: number, voteType: string) => {
    setCommunityWords((prev) =>
      prev.map((word) =>
        word.id === wordId
          ? {
              ...word,
              score: voteType === "upVote" ? word.score + 1 : word.score - 1,
            }
          : word,
      ),
    );
  };

 
  useEffect(() => {
    fetchCommunityWords(page);
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1 &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const saveCommunityWords = () => {
    if (communityWords.length > 0) {
      console.log("Sparar community-ord till localStorage: ", communityWords);
      localStorage.setItem(
        "savedCommunityWords",
        JSON.stringify(communityWords),
      );
    } else {
      console.log("Inga community-ord att spara.");
      localStorage.removeItem("savedCommunityWords");
    }
  };

  useEffect(() => {
    const getSavedCommunityWords = () => {
      const savedCommunityWords = localStorage.getItem("savedCommunityWords");
      if (savedCommunityWords) {
        console.log("Hämtar community-ord från localStorage");
        setCommunityWords(JSON.parse(savedCommunityWords));
      }
    };

    getSavedCommunityWords();
  }, []);

  useEffect(() => {
    localStorage.setItem("communityWords", JSON.stringify(communityWords));
  }, [communityWords]);
 */
  if (loading) return <p>Laddar ord...</p>;

  return (
    <>
      <div className="community-words-wrapper w-full border border-letterTile">
        <h2 className="community-words-h2">Community Ord:</h2>
        <div className="sorting-button-container relative flex flex-nowrap items-center justify-between text-xs font-thin">
          <strong className="font-bold">Sortera:</strong>{" "}
          <p
            onClick={() =>
              setSortMethod(sortMethod === "score" ? "date" : "score")
            }
            className={`absolute right-[85px] px-1 ${sortMethod === "score" ? "rounded-sm bg-letterTile text-center text-black" : ""}`}
          >
            Antal röster
          </p>
          <p
            onClick={() =>
              setSortMethod(sortMethod === "date" ? "score" : "date")
            }
            className={`absolute right-0 px-1 ${sortMethod === "date" ? "rounded-sm bg-letterTile text-center text-black" : ""}`}
          >
            Senast tillagt
          </p>
        </div>

        <div className="community-words-container text-s max-h-[290px] w-full overflow-auto border-t font-thin">
          {communityWords.length > 0 ? (
            <ul>
              {sortedResults.map((word) => (
                <li
                  className="community-words-list-item relative m-1 flex flex-nowrap items-center justify-between text-sm font-thin"
                  key={word.id}
                >
                  {word.word.toUpperCase()}
                  <div
                    className="up-vote-container absolute right-[130px]"
                    onClick={() => handleVote(word.id!, "upVote")}
                  >
                    <CircleIcon
                      content={<AiOutlineArrowUp size={15} />}
                      bgColor="bg-none"
                      textColor="text-green-400"
                      borderColor="border-none"
                      tooltip={`Rösta om ${word.word.toUpperCase()} gick att använda!`}
                      placement="bottom"
                    />
                  </div>
                  <div
                    className="down-vote-container absolute right-[110px]"
                    onClick={() => handleVote(word.id!, "downVote")}
                  >
                    <CircleIcon
                      content={<AiOutlineArrowDown size={15} />}
                      bgColor="bg-none"
                      textColor="text-red-400"
                      borderColor="border-none"
                      tooltip={`Rösta om ${word.word} inte gick att använda!`}
                      placement="bottom"
                    />
                  </div>
                  <div className="word-score absolute right-[90px]">
                    {word.score}
                  </div>
                  <div className="absolute right-[60px]">
                    <CircleIcon
                      content={"?"}
                      bgColor="bg-none"
                      textColor=""
                      borderColor=""
                      tooltip={`"Score" är summan av "up-votes"(${word.up_votes}) - (${word.down_votes})"down-votes" `}
                      placement="right"
                    />
                  </div>
                  <div className="word-status absolute right-[12px]">
                    <CircleIcon
                      bgColor=""
                      content={format(word.created_at, "dd/MM")}
                      textColor=""
                      borderColor="border-none"
                      tooltip={format(word.created_at, "do/MMMM/yyy")}
                      placement="left"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Inga ord hittades.</p>
          )}
        </div>
      </div>

      <div ref={observeRef} className="h-[50px]" />
    </>
  );
};

export default CommunityWords;
