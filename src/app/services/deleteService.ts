/**
 * handleDelete handles deletions by adding two parameters.
 * @param apiUrl example: "/api/report" - is the route to the API Endpoint
 * @param word example: word or "apple" - is the expected item you wish to be deleted
 * @returns
 */
export const handleDeletion = async (apiUrl: string, word: string) => {
  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word }),
    });

    if (!response.ok) throw new Error("Failed to delete word");

    return await response.json();
  } catch (error) {
    console.error("Failed to delete item: ", error);
    throw error;
  }
};
