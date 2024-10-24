"use client";
import { AiOutlinePlus } from "react-icons/ai";
import ToggleModal from "../utils/ToggleModal";
import WordContributionForm from "./AddWord/WordContributionForm";

const AddWord = () => {
  return (
    <div className="absolute left-0">
      <ToggleModal
        IconComponent={AiOutlinePlus}
        ContentComponent={WordContributionForm}
        title="Lägg till ett ord"
      />
    </div>
  );
};

export default AddWord;
