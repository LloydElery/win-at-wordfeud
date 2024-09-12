"use client";
import Link from "next/link";
import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import CustomSignIn from "./_ui/CustomSignIn";
import { useRouter } from "next/navigation";

const Settings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSettings = () => {
    router.push("/settings");
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <Link href={"/"}>
          <AiFillSetting onClick={toggleSettings} size={30} />
        </Link>
      </div>
      <div>
        {isOpen && (
          <div className="settings-panel bg-modalGrey">
            <div className="settings-header">
              <h2>Settings</h2>
              <button
                onClick={toggleSettings}
                className="close-button cursor-pointer bg-none"
              >
                X
              </button>
            </div>
            <div className="settings-content flex items-center justify-between">
              <CustomSignIn />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Settings;
