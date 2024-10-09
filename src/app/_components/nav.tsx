import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LetterTile } from "./LetterTile";
import LetterTiles from "./_ui/LetterTiles";

export function Nav({ query }: { query: string }) {
  return (
    <nav className="navigation">
      <LetterTiles query={query} TWCSSClass="letter-tile md:flex hidden" />
      <div className="nav-content-container">
        <div className="sign-in-and-profile z-20 flex items-center">
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
