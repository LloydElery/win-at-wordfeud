"use client";
import { AiOutlinePlus } from "react-icons/ai";
import ToggleModal from "../utils/ToggleModal";
import WordContributionForm from "./AddWord/WordContributionForm";

const AddWord = () => {
  // Logic & functionality

  return (
    <ToggleModal
      IconComponent={AiOutlinePlus}
      ContentComponent={WordContributionForm}
      title="Lägg till ett ord"
    />
  );
};

export default AddWord;
