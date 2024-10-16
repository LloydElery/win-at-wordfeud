import CircleIcon from "./CircleIcon";
import { AiOutlineSearch } from "react-icons/ai";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface ISearchFormProps {
  query: string;
  handleSubmit: React.FormEventHandler;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
}
const CustomSearchForm = forwardRef(
  ({ query, handleSubmit, handleInputChange }: ISearchFormProps, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focusInput() {
        if (inputRef.current) inputRef.current.focus();
      },
      triggerSearch(newQuery: string) {
        if (inputRef.current) inputRef.current.value = newQuery;
        handleSubmit({ preventDefault: () => {} } as React.FormEvent);
      },
    }));

    const handleVirtualKeyboardVisibility = () => {
      if (document.visibilityState === "visible" && inputRef.current) {
        inputRef.current.click();
      }
    };

    useEffect(() => {
      document.addEventListener(
        "visibilitychange",
        handleVirtualKeyboardVisibility,
      );

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVirtualKeyboardVisibility,
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
  },
);

export default CustomSearchForm;
