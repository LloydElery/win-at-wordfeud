"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { DeleteButton } from "../_ui/DeleteButton";

interface IReports {
  word: string;
}

const Reports: React.FC = () => {
  const { user } = useUser();
  const [reportedWords, setReportedWords] = useState<IReports[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleUIAfterDelete = (deletedWord: string) => {
    setReportedWords((prevWords) =>
      prevWords.filter((word) => word.word !== deletedWord),
    );
  };

  useEffect(() => {
    if (!user) return;

    const fetchReportedWordsByUserId = async () => {
      try {
        const response = await fetch(`/api/report?userId=${user.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch reported words.");
        }

        const data = await response.json();
        setReportedWords(data.userReports);
      } catch (error) {
        console.error("Error fetching reported words", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReportedWordsByUserId();
  }, [user]);

  if (loading) return <p>Laddar rapporterade ord...</p>;

  return (
    <>
      <div className="w-full border border-letterTile">
        <h2>Rapporterade Ord:</h2>
        <div className="text-s max-h-[310px] w-full overflow-auto border-t font-thin">
          {reportedWords.length > 0 ? (
            <ul>
              {reportedWords.map((words, index) => (
                <li key={index}>
                  {words.word}
                  <DeleteButton
                    itemToDelete={words.word}
                    apiUrl="/api/report"
                    deleteHandler={() => handleUIAfterDelete(words.word)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>Inga rapporterade ord.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Reports;
