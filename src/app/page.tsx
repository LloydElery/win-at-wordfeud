import {
  fetchSAOL14FilteredWords,
  saveFilteredWordsToDataBase,
} from "~/server/api/scrape";
import { db } from "~/server/db";

// Automaticly updates the deployed project whenever content in the db updates
export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Words:
      <div className="flex flex-wrap justify-center gap-1"></div>
    </main>
  );
}
