"use client";
import { useState } from "react";

interface IToggleModal {
  IconComponent: React.FC<{ onClick: () => void; size: number }>;
  ContentComponent: React.FC;
  title: string;
}

const ToggleModal: React.FC<IToggleModal> = ({
  IconComponent,
  ContentComponent,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={title + "icon"}>
        <IconComponent onClick={toggleModal} size={30} />
      </div>
      <div>
        {isOpen && (
          <div className="modal-panel bg-modalGrey">
            <div className="modal-header">
              <h2 className="font-light">{title}</h2>

              <button
                onClick={toggleModal}
                className="close-button cursor-pointer bg-none"
              >
                X
              </button>
            </div>
            <div className="modal-content">
              <ContentComponent />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ToggleModal;
