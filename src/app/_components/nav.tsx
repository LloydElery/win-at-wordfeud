import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";

export function Nav() {
  return (
    <nav className="absolute bottom-0 flex w-full items-center justify-between border-b p-4 text-xl font-semibold text-white">
      <div>Wordfeud Hjälpen</div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </div>
    </nav>
  );
}
