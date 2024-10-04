import CircleIcon from "./CircleIcon";
import { AiOutlineSearch } from "react-icons/ai";
import { ChangeEventHandler, FormEventHandler } from "react";

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
  return (
    <>
      <form
        className="item-center flex w-fit gap-1 rounded-md border bg-letterTile px-1 py-px"
        onSubmit={handleSubmit}
      >
        <input
          className="ml-7 rounded-sm border border-gray-500 bg-transparent px-1 text-black"
          type="text"
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
        <button className="absolute text-black" type="submit">
          <AiOutlineSearch size={26} />
        </button>
      </form>
    </>
  );
};

export default CustomSearchForm;
