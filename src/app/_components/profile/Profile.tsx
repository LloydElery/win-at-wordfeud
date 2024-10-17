import { ITextButton } from "../_ui/TextButton";
import CommunityWords from "./CommunityWords";
import Reports from "./Reports";

const Profile: React.FC<ITextButton> = ({ selectedPage }) => {
  return (
    <>
      {selectedPage === "Community ord" && <CommunityWords />}
      {selectedPage === "Rapporterade ord" && <Reports />}
    </>
  );
};

export default Profile;
