import { db } from "~/server/db";

// Automaticly updates the deployed project whenever content in the db updates
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const words = await db.query.words.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Words:
      <div className="flex flex-wrap justify-center gap-1">
        {words.map((word) => (
          <div key={word.id}>
            <p>{word.letters} |</p>
          </div>
        ))}
      </div>
    </main>
  );
}
