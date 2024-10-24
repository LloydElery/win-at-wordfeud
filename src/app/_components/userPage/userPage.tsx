"use client";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { PiDatabaseLight } from "react-icons/pi";
import CommunityWords from "./CommunityWords";
import Reports from "./Reports";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import ToggleModal from "~/app/utils/ToggleModal";
import CustomSignIn from "../_ui/CustomSignIn";
import TextButton from "../_ui/TextButton";
import { AdminProvider } from "~/app/context/AdminContext";

const UserPage: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>("Rapporterade ord");

  const componentMap: { [key: string]: React.FC } = {
    "Community ord": CommunityWords,
    "Rapporterade ord": Reports,
  };

  const renderComponent = () => {
    const Component = componentMap[selectedPage];
    return Component ? <Component /> : null;
  };

  //TODO Move to bottom right

  return (
    <>
      <SignedOut>
        <ToggleModal
          IconComponent={AiOutlineUser}
          ContentComponent={CustomSignIn}
          title="Login"
        />
      </SignedOut>
      <SignedIn>
        <AdminProvider>
          <div className="absolute left-10">
            <ToggleModal
              IconComponent={PiDatabaseLight}
              ContentComponent={renderComponent}
              title={<TextButton onSelectPage={setSelectedPage} />}
            />
          </div>
        </AdminProvider>
      </SignedIn>
    </>
  );
};

export default UserPage;
