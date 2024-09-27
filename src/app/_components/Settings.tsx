"use client";
import {
  AiFillAccountBook,
  AiFillSetting,
  AiOutlineUser,
} from "react-icons/ai";
import ToggleModal from "../utils/ToggleModal";
import CustomSignIn from "../_components/_ui/CustomSignIn";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { clerkClient, User } from "@clerk/nextjs/server";
import { Name } from "drizzle-orm";
import AddWord from "./AddWord";

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
          ContentComponent={AddWord}
          title="My Contributions"
        />
      </SignedIn>
    </>
  );
};

export default Settings;
