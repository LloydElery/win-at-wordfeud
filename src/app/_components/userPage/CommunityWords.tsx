"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CircleIcon from "../_ui/CircleIcon";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { format } from "date-fns";
import { AdminDeleteWordButton } from "../_ui/AdminDeleteWordButton";
import {
  fetchCommunityWordsFromDatabase,
  fetchCurrentVoteValueFromDatabase,
  setCommunityWordScore,
} from "./services";

export const dynamic = "force-dynamic";
export interface ICommunityWords {
  id?: number;
  word: string;
  normalized_word: string;
  up_votes: number;
  down_votes: number;
  score: number;
  value: number;
  reports: number;
  created_at: Date;
  status: string;
  source?: string;
}

export interface IWordVote {
  wordId: number;
  initialUpVotes: number;
  initialDownVotes: number;
  userHasVoted: boolean;
  currentUserId: string | null;
}

export const calculateScore = (up_votes: number, down_votes: number) => {
  return up_votes - down_votes;
};

const CommunityWords: React.FC = () => {
  const { user } = useUser();
  const [communityWords, setCommunityWords] = useState<ICommunityWords[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState<"score" | "date">("date");

  const fetchCommunityWords = async () => {
    try {
      setLoadingMessage("Hämtar ord och röster från databasen...");

      const communityWordsArray = (await fetchCommunityWordsFromDatabase())
        .communityWords;

      setCommunityWords((prev) => {
        const uniqueWords = communityWordsArray.filter(
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchCommunityWords();
  }, [user]);

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

      const currentVoteValue = (
        await fetchCurrentVoteValueFromDatabase(wordId, user?.id!)
      ).currentVoteValue;

      const voteValue = voteType === "upVote" ? 1 : -1;

      // Check to see if user already have an active vote that is equal to voteType
      if (currentVoteValue === voteValue) {
        setLoadingMessage(
          `${user?.firstName}, du har redan röstat ${voteType === "upVote" ? "up" : "ner"} det här ordet`,
        );
        return;
      }

      await setCommunityWordScore(wordId, voteType);
      await fetchCommunityWords();
      setLoadingMessage("Tack för att du röstade!");
      await updateCommunityWordScoreUI(wordId, voteType);
    } catch (error) {
      console.error("Error voting", error);
    } finally {
    }
  };

  const updateCommunityWordScoreUI = async (
    wordId: number,
    voteType: string,
  ) => {
    // Update "score" UI (+1 / -1)
    setCommunityWords((prevWords) =>
      prevWords.map((word) => {
        if (word.id === wordId) {
          const updatedUpVotes =
            voteType === "upVote" ? word.up_votes + 1 : word.up_votes;
          const updatedDownVotes =
            voteType === "downVote" ? word.down_votes + 1 : word.down_votes;

          return {
            ...word,
            up_votes: updatedUpVotes,
            down_votes: updatedDownVotes,
            score: calculateScore(updatedUpVotes, updatedDownVotes),
          };
        }
        return word;
      }),
    );
  };

  if (loading) return <p>Laddar ord...</p>;

  const setStatus = (upVotes: number, downVotes: number) => {
    const status = upVotes - downVotes;
    if (status >= 10) return "approved";
    else if (status < 0) return "rejected";
    return "pending";
  };

  const handleWordDeletion = (wordId: number) => {
    setCommunityWords((prevWords) =>
      prevWords.filter((word) => word.id !== wordId),
    );
  };

  return (
    <>
      <div className="community-words-wrapper w-full border border-letterTile">
        <h2 className={!loadingMessage ? "community-words-h2" : "hidden"}>
          Community Ord:
        </h2>
        <p
          className={
            loadingMessage
              ? "left-[25px] top-[70px] z-10 h-fit min-h-[28px] w-full text-sm font-thin"
              : "hidden"
          }
        >
          {loadingMessage}
        </p>
        <div className="sorting-button-container relative flex flex-nowrap items-center justify-between text-xs font-thin">
          <strong className="font-bold">Sortera:</strong>{" "}
          <p
            onClick={() =>
              setSortMethod(sortMethod === "score" ? "date" : "score")
            }
            className={`absolute right-[100px] px-1 ${sortMethod === "score" ? "rounded-sm bg-letterTile text-center text-black" : ""}`}
          >
            Score
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
                  <p className={setStatus(word.up_votes, word.down_votes)}>
                    {word.word.toUpperCase()}
                  </p>
                  <div
                    className={"up-vote-container absolute right-[170px]"}
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
                    className={"down-vote-container absolute right-[150px]"}
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

                  <div className="word-score absolute right-[125px]">
                    {word.up_votes - word.down_votes}
                  </div>
                  <div className="absolute right-[95px]">
                    <CircleIcon
                      content={"?"}
                      bgColor="bg-none"
                      textColor=""
                      borderColor=""
                      tooltip={
                        <span className="inline-flex items-center space-x-1">
                          "Score" = <AiOutlineArrowUp color="green" size={15} />
                          <span>{word.up_votes} </span>
                          <span>-</span>
                          <span>{word.down_votes}</span>
                          <AiOutlineArrowDown color="red" size={15} />
                        </span>
                      }
                      placement="left"
                    />
                  </div>
                  <div className="admin-delete-button absolute right-[50px]">
                    <AdminDeleteWordButton
                      wordId={word.id!}
                      word={word.word}
                      table="community_words"
                      onWordDeleted={handleWordDeletion}
                    />
                  </div>
                  <div className="word-added-date absolute right-[15px]">
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
    </>
  );
};

export default CommunityWords;
