import { useUser } from "@clerk/nextjs";

export default function UpdateWordValueButton() {
  const { user } = useUser();
  const admin = "user_2lpJ2Swoyz7ncmq7o2fZemvG2Gw";
  //TODO Hide admin id
  //FIXME process.env.ADMIN does not fetch the id in an async maner.

  const handleUpdate = async () => {
    try {
      const response = await fetch("/api/update-word-value", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorData = await response.json();
        alert(`Failed to update word values: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("An error occurred during the request.");
    }
  };

  if (user?.id !== admin!) return null;

  return (
    <>
      <button
        className="rounded border border-gray-400 bg-letterTile px-1 font-light text-black shadow hover:bg-gray-100"
        onClick={handleUpdate}
      >
        Update Word Values
      </button>
    </>
  );
}
