/* import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { RxReset } from "react-icons/rx";
import CircleIcon from "../_ui/CircleIcon";
import {
  fetchCurrentVoteValueFromDatabase,
  setCommunityWordScore,
  submitVote,
} from "../userPage/services";

interface IVoteButton {
  wordId: number;
  userId: any;
  voteType: "upVote" | "downVote" | "reset";
  onVote: (wordId: number, voteType: "upVote" | "downVote" | "reset") => void;
  disabled?: boolean;
}

const VoteButton: React.FC<IVoteButton> = ({
  wordId,
  userId,
  voteType,
  onVote,
  disabled,
}) => {
  const [currentVoteValue, setCurrentVoteValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVote = async () => {
      try {
        const { currentVoteValue } = await fetchCurrentVoteValueFromDatabase(
          wordId,
          userId,
        );
        setCurrentVoteValue(currentVoteValue);
      } catch (error) {
        console.error("Error fetching vote:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVote();
  }, [userId, wordId]);

  const handleClick = () => {
    onVote(wordId, voteType);
  };

  const getIcon = () => {
    switch (voteType) {
      case "upVote":
        return <AiOutlineArrowUp size={15} />;
      case "downVote":
        return <AiOutlineArrowDown size={15} />;
      case "reset":
        return <RxReset size={15} />;
      default:
        return null;
    }
  };

  return (
    <div onClick={!disabled ? handleClick : undefined}>
      <CircleIcon
        content={getIcon()}
        bgColor="bg-none"
        textColor={voteType === "upVote" ? "text-green-400" : "text-red-400"}
        borderColor="border-none"
        tooltip={`${
          voteType === "upVote"
            ? "Rösta upp"
            : voteType === "downVote"
              ? "Rösta ner"
              : "Återställ röst"
        }`}
        placement="bottom"
      />
    </div>
  );
};

export default VoteButton;
function fetchCommunityWords() {
  throw new Error("Function not implemented.");
}
 */
