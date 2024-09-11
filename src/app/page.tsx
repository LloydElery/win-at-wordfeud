import { specialGridLayoutItems } from "./_components/gameboard/generateGameboard";
import Grid from "./_components/gameboard/Grid";
import Header from "./_components/Header";
import SearchForm from "./_components/SearchForm";

// Automaticly updates the deployed project whenever content in the db updates
export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-primaryBlue text-white">
      <Header />
      <SearchForm />
      <Grid size={15} specialGridItems={specialGridLayoutItems} />
    </main>
  );
}
