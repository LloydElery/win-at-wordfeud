"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

interface ICommunityWords {
  word: string;
}

const CommunityWords: React.FC = () => {
  const { user } = useUser();
  const [wordContributions, setWordContributions] = useState<ICommunityWords[]>(
    [],
  );
  const [upVote, setUpVote] = useState<number>(+1);
  const [downVote, setDownVote] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);

  const handleUIAfterVote = (vote: number) => {
    //TODO Add logic to handle voting
  };

  useEffect(() => {
    if (!user) return;

    const fetchCommunityWords = async () => {
      try {
        const response = await fetch(`/api/community-words`); // Do i need this to make sure an vote can only happen once in either direction?

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
      <div className="w-full border border-letterTile">
        <h2>Community Ord:</h2>
        <div className="text-s max-h-[238px] w-full overflow-auto border-t font-thin">
          {wordContributions.length > 0 ? (
            <ul>
              {wordContributions.map((words, index) => (
                <li className="mx-1" key={index}>
                  {words.word}
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
