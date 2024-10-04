import { Tooltip, TooltipPlacement } from "@nextui-org/tooltip";
import React, { useEffect, useRef } from "react";

export interface ICircleIcon {
  content: string | number;
  bgColor: string;
  borderColor: string;
  textColor: string;
  tooltip: string;
  placement: TooltipPlacement;
}

const CircleIcon: React.FC<ICircleIcon> = ({
  content,
  bgColor,
  borderColor,
  textColor,
  tooltip,
  placement,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutsideTooltip = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const toggleTooltip = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutsideTooltip);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideTooltip);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideTooltip);
    };
  }, [isOpen]);

  //TODO Make the clickevent to close tooltip and modal a reusable function if possible

  return (
    <div
      ref={tooltipRef}
      onClick={toggleTooltip}
      className="flex size-fit cursor-pointer self-center p-px"
    >
      <Tooltip
        size="sm"
        showArrow={true}
        isOpen={isOpen}
        placement={placement}
        content={
          <div className="flex rounded-md bg-letterTile px-1 text-black">
            <div className="text-tiny">{tooltip}</div>
          </div>
        }
        trigger="focus"
      >
        <div
          className={`${borderColor} ${bgColor} ${textColor} h-5 w-5 content-center place-self-center rounded-full border text-center text-xs font-normal`}
        >
          {content}
        </div>
      </Tooltip>
    </div>
  );
};

export default CircleIcon;
