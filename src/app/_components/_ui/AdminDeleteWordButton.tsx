import { useAdmin } from "~/app/context/AdminContext";

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
  const isAdmin = useAdmin();

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

  if (isAdmin === undefined) return null;
  if (!isAdmin) return null;

  return (
    <>
      <button
        className="h-5 w-5 rounded-full bg-red-600 inner-border inner-border-black"
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
