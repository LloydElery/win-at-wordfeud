"use client";
import { AiFillSetting, AiOutlineUser } from "react-icons/ai";
import ToggleModal from "../utils/ToggleModal";
import CustomSignIn from "../_components/_ui/CustomSignIn";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Profile from "./profile/Profile";
import TextButton from "./_ui/TextButton";
import { useState } from "react";
import CommunityWords from "./profile/CommunityWords";
import Reports from "./profile/Reports";

const Settings: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>("Rapporterade ord");

  const componentMap: { [key: string]: React.FC } = {
    "Community ord": CommunityWords,
    "Rapporterade ord": Reports,
  };

  const handleSelectPage = (pageName: string) => {
    setSelectedPage(pageName);
  };

  const renderComponent = () => {
    const Component = componentMap[selectedPage];
    return Component ? <Component /> : null;
  };

  return (
    <>
      <SignedOut>
        <ToggleModal
          IconComponent={AiFillSetting}
          ContentComponent={CustomSignIn}
          title="Login"
        />
      </SignedOut>
      <SignedIn>
        <ToggleModal
          IconComponent={AiOutlineUser}
          ContentComponent={renderComponent}
          title={<TextButton onSelectPage={setSelectedPage} />}
        />
      </SignedIn>
    </>
  );
};

export default Settings;
