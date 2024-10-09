import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import LetterTiles from "./_ui/LetterTiles";
import { AiOutlineUser } from "react-icons/ai";

export function Nav({ query }: { query: string }) {
  return (
    <nav className="navigation">
      <LetterTiles query={query} TWCSSClass="letter-tile md:flex hidden" />
      <div className="nav-content-container">
        <div className="sign-in-and-profile z-20 flex items-center">
          <SignedOut>
            <SignInButton>
              <button className="rounded-full border border-letterTile bg-gameboardBG">
                <AiOutlineUser size={30} />
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
