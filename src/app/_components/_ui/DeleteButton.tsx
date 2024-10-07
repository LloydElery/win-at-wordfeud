import React from "react";
import { handleDeletion } from "~/app/services/deleteService";
import CircleIcon from "./CircleIcon";

interface IDeleteButton {
  itemToDelete: string;
  apiUrl: string;
  deleteHandler?: () => void;
}

export const DeleteButton: React.FC<IDeleteButton> = ({
  itemToDelete,
  apiUrl,
  deleteHandler,
}) => {
  const handleClick = async () => {
    try {
      await handleDeletion(apiUrl, itemToDelete);
    } catch (error) {
      console.error(`Failed to delete item: ${itemToDelete}`, error);
    }
  };
  return (
    <>
      <button onClick={handleClick}>
        <CircleIcon
          bgColor="bg-red-600"
          textColor="text-black"
          borderColor="border-black"
          content="X"
          tooltip={`Radera "${itemToDelete}"`}
          placement="left"
        />
      </button>
    </>
  );
};
