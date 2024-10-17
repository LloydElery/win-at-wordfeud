"use client";
import { AiFillSetting, AiOutlineUser } from "react-icons/ai";
import ToggleModal from "../utils/ToggleModal";
import CustomSignIn from "../_components/_ui/CustomSignIn";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Profile from "./profile/Profile";

const Settings = () => {
  return (
    <>
      <SignedOut>
        <ToggleModal
          IconComponent={AiFillSetting}
          ContentComponent={CustomSignIn}
          title="Settings"
        />
      </SignedOut>
      <SignedIn>
        <ToggleModal
          IconComponent={AiOutlineUser}
          ContentComponent={Profile}
          title="Contributions | Reported words"
        />
      </SignedIn>
    </>
  );
};

export default Settings;
