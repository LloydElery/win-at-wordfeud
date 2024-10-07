export const handleDeletion = async (url: string, item: string) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify({ item }),
    });

    const data = await response.json();

    if (response.ok) return data;
    else throw new Error(data.error || "Failed to process request");
  } catch (error) {
    console.error("Failed to delete item: ", error);
    throw error;
  }
};
