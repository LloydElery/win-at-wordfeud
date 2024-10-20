import AddWord from "./AddWord";
import UserPage from "./userPage/userPage";

const Header = () => {
  return (
    <>
      <section className="header-section flex w-full items-end justify-between text-xl font-bold tracking-wider text-white">
        <div>Wordfeud Hjälpen</div>
        <div className="header-icons flex gap-5">
          <UserPage />
          <AddWord />
        </div>
      </section>
    </>
  );
};

export default Header;
