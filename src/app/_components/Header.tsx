import Settings from "./Settings";
import AddWord from "./AddWord";

const Header = () => {
  return (
    <>
      <section className="header-section flex w-full items-end justify-between text-xl font-bold tracking-wider text-white">
        <div>Wordfeud Hjälpen</div>
        <div className="header-icons flex gap-5">
          <Settings />
          <AddWord />
        </div>
      </section>
    </>
  );
};

export default Header;
