import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { AiOutlineUser } from "react-icons/ai";

export function Nav() {
  return (
    <nav className="navigation">
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
