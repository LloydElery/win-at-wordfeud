import Link from "next/link";
import { AiFillSetting, AiOutlinePlus } from "react-icons/ai";

const Header = () => {
  // Logic & functionality

  return (
    <>
      <section className="header-section flex min-h-20 w-full items-end justify-between p-4 text-xl font-bold tracking-wider text-white">
        <div>Wordfeud Hjälpen</div>
        <div className="header-icons flex gap-5">
          <Link href={"/"}>
            <AiFillSetting size={30} />
          </Link>

          <Link href={"/"}>
            <AiOutlinePlus size={30} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Header;
