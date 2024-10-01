import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LetterTile } from "./LetterTile";

export function Nav({ query }: { query: string }) {
  return (
    <nav className="fixed bottom-0 flex w-full items-center justify-between bg-primaryBlue p-4 text-xl font-semibold text-white md:max-w-screen-md">
      <div className="letter-tiles flex">
        {query.split("").map((letter, index) => (
          <LetterTile key={index} letter={letter} />
        ))}
      </div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
