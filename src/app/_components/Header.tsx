import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import Settings from "./Settings";

const Header = () => {
  return (
    <>
      <section className="header-section flex min-h-20 w-full items-end justify-between p-4 text-xl font-bold tracking-wider text-white">
        <div>Wordfeud Hjälpen</div>
        <div className="header-icons flex gap-5">
          <Settings />
          <Link href={"/"}>
            <AiOutlinePlus size={30} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Header;
