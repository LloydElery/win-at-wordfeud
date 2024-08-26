import {
  fetchSAOL14FilteredWords,
  saveFilteredWordsToDataBase,
} from "~/server/api/scrape";

// Automaticly updates the deployed project whenever content in the db updates
export const dynamic = "force-dynamic";

export default async function HomePage() {
  /*   async function populateDatabase() {
    try {
      const url = process.env.URL;
      fetchSAOL14FilteredWords(url!).then((filteredWords) => {
        const words: string[] = filteredWords;

        if (!Array.isArray(words)) {
          throw new Error(
            "Data format is incorrect. Expected an array of words.",
          );
        }
        saveFilteredWordsToDataBase(words);
      });

      console.log("Database populated successfully!");
    } catch (error) {
      console.error("Error populating database:", error);
    }
  }
  populateDatabase(); */

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Words:
      <div className="flex flex-wrap justify-center gap-1"></div>
    </main>
  );
}
