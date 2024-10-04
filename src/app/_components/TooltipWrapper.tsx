import { Tooltip, TooltipPlacement, useTooltip } from "@nextui-org/tooltip";
import React, { useEffect, useRef } from "react";

export interface ITooltipWrapper {
  tooltipContent: string;
  placement?: TooltipPlacement | null;
  children: React.ReactNode;
}

const TooltipWrapper: React.FC<ITooltipWrapper> = ({
  tooltipContent,
  placement,
  children,
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

  return (
    <Tooltip
      size="sm"
      showArrow={true}
      isOpen={isOpen}
      placement={placement ? placement : "top"}
      content={
        <div className="flex rounded-md bg-letterTile px-2 py-1 text-black">
          <div className="text-tiny">{tooltipContent}</div>
        </div>
      }
    >
      <div ref={tooltipRef} onClick={toggleTooltip}>
        {children}
      </div>
    </Tooltip>
  );
};

export default TooltipWrapper;
