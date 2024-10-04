import { Tooltip, TooltipPlacement } from "@nextui-org/tooltip";
import React from "react";

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

  const toggleTooltip = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div onClick={toggleTooltip} className="flex">
      <Tooltip
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
