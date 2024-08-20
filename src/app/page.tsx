import { db } from "~/server/db";

const mockData = ["gris", "havsbris", "fönster", "flygplan", "ätbar"];

const mockWords = mockData.map((words, index) => ({
  id: index + 1,
  words,
}));
export default async function HomePage() {
  const words = await db.query.words.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-wrap gap-1">
        {mockWords.map((word) => (
          <div key={word.id} className="w-1/2 p-4">
            <p>{word.words}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1">
        {words.map((word) => (
          <div key={word.id} className="w-1/2 p-4">
            <p>{word.letters}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
