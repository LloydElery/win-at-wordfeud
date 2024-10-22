import { useAdmin } from "~/app/context/AdminContext";

export default function UpdateWordValueButton() {
  const isAdmin = useAdmin();

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

  if (!isAdmin) return null;
  if (isAdmin === undefined) return null;

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
