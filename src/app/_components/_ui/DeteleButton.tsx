import React from "react";
import { handleDeletion } from "~/app/services/deleteService";
import { ICircleIcon } from "./CircleIcon";

interface IDeleteButton {
  itemToDelete: any;
  apiUrl: string;
  authUser: string;
  deleteHandler?: () => void;
  CircleIcon: React.FC<ICircleIcon>;
}

const DeleteButton: React.FC<IDeleteButton> = ({
  itemToDelete,
  apiUrl,
  authUser,
  deleteHandler,
  CircleIcon,
}) => {
  const handleClick = async () => {
    try {
      await handleDeletion(apiUrl, itemToDelete);
      if (deleteHandler) deleteHandler();
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
          tooltip={`Radera ${itemToDelete}`}
          placement="left"
        />
      </button>
    </>
  );
};

export default DeleteButton;
