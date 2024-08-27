// This script is intended to not be used unless the db needs total re-building.

import {
  fetchSAOL14FilteredWords,
  saveFilteredWordsToDataBase,
} from "~/server/api/scrape";

async function populateDatabase() {
  try {
    const url = process.env.URL;
    fetchSAOL14FilteredWords(url!).then((filteredWords) => {
      const words: string[] = filteredWords;

      if (!Array.isArray(words)) {
        throw new Error(
          "Data format is incorrect. Expected an array of words.",
        );
      }
      saveFilteredWordsToDataBase(words);
    });

    console.log("Database populated successfully!");
  } catch (error) {
    console.error("Error populating database:", error);
  }
}
populateDatabase();
