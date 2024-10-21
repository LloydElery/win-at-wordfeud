import { useUser } from "@clerk/nextjs";
import { Word } from "~/app/utils/WordInterface";

export default function DeleteWordButton(word: Word) {
  const { user } = useUser();
  const admin = process.env.NEXT_PUBLIC_ADMIN;

  const handleWordDeletion = async (word: string) => {
    try {
      const response = await fetch("/api/word", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ word }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Word: ${word} has been processed: ${data.word}`);
      } else {
        console.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to delete word:", error);
    }
  };

  if (user?.id !== admin!) {
    return null;
  }

  // Rendera knappen om användaren är du
  return (
    <>
      <button
        className="h-5 w-5 rounded-full bg-red-600"
        onClick={() => {
          handleWordDeletion(word.word);
          alert(
            `Ordet är nu borttaget från databasen: ${word.word.toUpperCase()}`,
          );
        }}
      >
        X
      </button>
    </>
  );
}
