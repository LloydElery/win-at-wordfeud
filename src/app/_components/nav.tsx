import { SignedIn, UserButton } from "@clerk/nextjs";
import UserPage from "./userPage/userPage";
import AddWord from "./AddWord";

export function Nav() {
  return (
    <nav className="navigation">
      <div className="nav-content-container">
        <div className="sign-in-and-profile z-20 flex items-center">
          <AddWord />
          <UserPage />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
