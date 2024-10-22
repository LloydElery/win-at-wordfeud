import { useUser } from "@clerk/nextjs";

interface IAdminDeleteWordButtonProps {
  wordId: number;
  word: string;
  table: string;
  onWordDeleted: (wordId: number) => void;
}

export const AdminDeleteWordButton: React.FC<IAdminDeleteWordButtonProps> = ({
  wordId,
  word,
  table,
  onWordDeleted,
}) => {
  const { user } = useUser();
  const admin = process.env.NEXT_PUBLIC_ADMIN;

  const handleWordDeletion = async () => {
    try {
      const response = await fetch(`/api/admin?table=${table}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ wordId }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Word: ${word} has been processed: ${data.word}`);
        onWordDeleted(wordId);
      } else console.error(`Error: ${data.error}`);
    } catch (error) {
      console.error("Failed to delete word:", error);
    }
  };

  if (user?.id !== admin) return null;

  return (
    <>
      <button
        className="h-5 w-5 rounded-full bg-red-600"
        onClick={() => {
          handleWordDeletion();
          alert(`${word.toUpperCase()} är nu borttaget från ${table} `);
        }}
      >
        X
      </button>
    </>
  );
};
