import DLGridItem from "./DLGridItem";
import DWGridItem from "./DWGridItem";
import TLGridItem from "./TLGridItem";
import TWGridItem from "./TWGridItem";

export const gridItemMap: Record<string, React.FC> = {
  DubbleLetter: DLGridItem,
  DubbleWord: DWGridItem,
  TrippleLetter: TLGridItem,
  TrippleWord: TWGridItem,
};
