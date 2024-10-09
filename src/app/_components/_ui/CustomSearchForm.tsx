import CircleIcon from "./CircleIcon";
import { AiOutlineSearch } from "react-icons/ai";
import { ChangeEventHandler, FormEventHandler, useEffect, useRef } from "react";

interface ISearchFormProps {
  query: string;
  handleSubmit: FormEventHandler;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
}
const CustomSearchForm: React.FC<ISearchFormProps> = ({
  query,
  handleSubmit,
  handleInputChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleViritualKeyboardVisibility = () => {
    if (document.visibilityState === "visible" && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.display = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }
    document.body.style.position = "";
    document.body.style.width = "";
  };

  useEffect(() => {
    document.addEventListener(
      "visibilitychange",
      handleViritualKeyboardVisibility,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleViritualKeyboardVisibility,
      );
    };
  }, []);
  return (
    <>
      <form
        className="item-center my-1 ml-px flex w-fit gap-1 rounded-md border bg-letterTile px-1"
        onSubmit={handleSubmit}
      >
        <button className="" type="submit">
          <CircleIcon
            bgColor="none"
            textColor="text-black"
            borderColor="none"
            content={<AiOutlineSearch size={20} />}
            tooltip=""
            placement="top"
          />
        </button>
        <input
          className="rounded-sm border border-gray-500 bg-transparent px-1 text-black"
          type="text"
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          placeholder="SÖK ORD"
        />

        <CircleIcon
          bgColor="slate"
          textColor="text-black"
          borderColor="border-black"
          content={"?"}
          tooltip="Använd mellanslag för blanka bokstäver"
          placement="bottom-start"
        />
      </form>
    </>
  );
};

export default CustomSearchForm;
