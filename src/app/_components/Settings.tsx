"use client";
import { AiFillSetting } from "react-icons/ai";
import ToggleModal from "../utils/ToggleModal";
import CustomSignIn from "../_components/_ui/CustomSignIn";

const Settings = () => {
  return (
    <ToggleModal
      IconComponent={AiFillSetting}
      ContentComponent={CustomSignIn}
      title="Settings"
    />
  );
};

export default Settings;
