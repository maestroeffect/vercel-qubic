const axios = require("axios");

// Define the Stack Exchange API endpoint for Stack Overflow questions
const API_URL = "https://api.stackexchange.com/2.3/questions";

// Function to fetch questions from Stack Overflow
async function fetchQuestions() {
  try {
    const response = await axios.get(API_URL, {
      params: {
        site: "stackoverflow", // Specify the site (Stack Overflow)
        order: "desc", // Order by descending (most recent first)
        sort: "activity", // Sort by activity (you can also use 'votes', 'creation', etc.)
        pagesize: 50, // Number of questions to fetch per request
      },
    });

    // Log the fetched questions
    console.log("Fetched Questions:", response.data.items);
  } catch (error) {
    console.error("Error fetching data from Stack Overflow:", error);
  }
}

// Call the function to fetch questions
fetchQuestions();
