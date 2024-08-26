import { fetchSAOL14FilteredWords } from "~/server/api/scrape";
import { db } from "~/server/db";

// Automaticly updates the deployed project whenever content in the db updates
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const words = await db.query.words.findMany();

  const url = process.env.URL;
  fetchSAOL14FilteredWords(url!).then((filteredWords) => {
    console.log(filteredWords[1]);
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Words:
      <div className="flex flex-wrap justify-center gap-1">
        {words.map((word) => (
          <div key={word.id}></div>
        ))}
      </div>
    </main>
  );
}
