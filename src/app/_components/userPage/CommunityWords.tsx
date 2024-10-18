"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CircleIcon from "../_ui/CircleIcon";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { capitalizeFirstLetter } from "~/app/utils/capitalizeFirstLetter";

export interface ICommunityWords {
  id?: number;
  reports?: number;
  upVotes?: number;
  downVotes?: number;
  score?: number;
  word: string;
  value?: number;
  status?: string;
}

const CommunityWords: React.FC = () => {
  const { user } = useUser();
  const [wordContributions, setWordContributions] = useState<ICommunityWords[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);

  const handleVote = async (
    wordId: number,
    voteType: "upVote" | "downVote",
  ) => {
    try {
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

      setWordContributions((prevWords) =>
        prevWords.map((word) =>
          word.id === wordId ? { ...word, ...updatedWord } : word,
        ),
      );
    } catch (error) {
      console.error("Error voting", error);
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchCommunityWords = async () => {
      try {
        const response = await fetch(`/api/community-words`);

        if (!response.ok) throw new Error("Failed to fetch community words");

        const data = await response.json();
        console.log(data.communityWords);
        setWordContributions(data.communityWords);
      } catch (error) {
        console.error("Error fetching community words", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunityWords();
  }, [user]);

  if (loading) return <p>Laddar ord...</p>;

  return (
    <>
      <div className="community-words-wrapper w-full border border-letterTile">
        <h2 className="community-words-h2">Community Ord:</h2>
        <div className="community-words-container text-s max-h-[310px] w-full overflow-auto border-t font-thin">
          {wordContributions.length > 0 ? (
            <ul>
              {wordContributions.map((words, index) => (
                <li
                  className="community-words-list-item relative mx-1 flex flex-nowrap items-center justify-between"
                  key={index}
                >
                  {words.word}
                  <div
                    className="up-vote-container absolute right-[130px]"
                    onClick={() => handleVote(words.id!, "upVote")}
                  >
                    <CircleIcon
                      content={<AiOutlineArrowUp size={15} />}
                      bgColor="bg-none"
                      textColor="text-green-400"
                      borderColor="border-none"
                      tooltip={`Rösta om ${words.word} gick att använda!`}
                      placement="top"
                    />
                  </div>
                  <div
                    className="down-vote-container absolute right-[110px]"
                    onClick={() => handleVote(words.id!, "downVote")}
                  >
                    <CircleIcon
                      content={<AiOutlineArrowDown size={15} />}
                      bgColor="bg-none"
                      textColor="text-red-400"
                      borderColor="border-none"
                      tooltip={`Rösta om ${words.word} inte gick att använda!`}
                      placement="bottom"
                    />
                  </div>
                  <div className="word-score absolute right-[90px]">
                    {words.score}
                  </div>
                  <div className="word-status">
                    <p>{capitalizeFirstLetter(words.status!)}</p>
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
