interface IProps {
  content: string | number;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const CircleIcon: React.FC<IProps> = ({
  content,
  bgColor,
  borderColor,
  textColor,
}) => {
  return (
    <div
      className={`${borderColor} ${bgColor} ${textColor} h-5 w-5 content-center place-self-center rounded-full border text-center text-xs font-normal`}
    >
      {content}
    </div>
  );
};

export default CircleIcon;
