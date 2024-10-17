export interface ITextButton {
  onSelectPage: (pageName: string) => void;
  selectedPage?: string;
}

const TextButton: React.FC<ITextButton> = ({ onSelectPage }) => {
  const communityWords = "Community ord";
  const reportedWords = "Rapporterade ord";

  return (
    <>
      <div className="self-center">
        <div className="grid grid-cols-3 grid-rows-1 text-center text-sm font-thin">
          <button onClick={() => onSelectPage(communityWords)}>
            {communityWords}
          </button>
          <p>|</p>
          <button onClick={() => onSelectPage(reportedWords)}>
            {reportedWords}
          </button>
        </div>
      </div>
    </>
  );
};

export default TextButton;
