"use client";
import { useEffect, useRef, useState } from "react";

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
  const modalRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutsideModal = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      iconRef.current &&
      !iconRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutsideModal);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [isOpen]);

  return (
    <>
      <div ref={iconRef} className={title + "_" + "icon"}>
        <IconComponent onClick={toggleModal} size={30} />
      </div>
      <div className="icon-container">
        {isOpen ? (
          <div className="modal-container">
            <div ref={modalRef} className="modal-panel bg-modalGrey">
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
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ToggleModal;
