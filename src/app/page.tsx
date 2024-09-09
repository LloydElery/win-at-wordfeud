import Grid from "./_components/Grid";
import SearchForm from "./_components/SearchForm";

// Automaticly updates the deployed project whenever content in the db updates
export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="bg-primaryBlue flex min-h-screen flex-col items-center justify-center text-white">
      <Grid />
      <SearchForm />
      <div className="flex flex-wrap justify-center gap-1"></div>
    </main>
  );
}
