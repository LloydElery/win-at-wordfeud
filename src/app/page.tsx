import { specialGridLayoutItems } from "./_components/gameboard/generateGameboard";
import Grid from "./_components/gameboard/Grid";
import Header from "./_components/Header";
import { GBLanguageProvider } from "./context/gameboard/GBLContext";
import { ClientSideWrapper } from "./CSPage";

// Automaticly updates the deployed project whenever content in the db updates
export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-primaryBlue p-[7px] text-white">
      <GBLanguageProvider>
        <Header />
        <ClientSideWrapper />
        <Grid size={15} specialGridItems={specialGridLayoutItems} />
      </GBLanguageProvider>
    </main>
  );
}
