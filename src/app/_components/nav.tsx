import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LetterTile } from "./LetterTile";
import LetterTiles from "./_ui/LetterTiles";

export function Nav({ query }: { query: string }) {
  return (
    <nav className="fixed bottom-0 flex w-full items-center justify-between bg-primaryBlue p-4 text-xl font-semibold text-white md:max-w-screen-md">
      <LetterTiles query={query} TWCSSClass="letter-tile md:flex hidden" />
      <div className="relative flex h-full w-full justify-end">
        <div className="flex items-center">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
