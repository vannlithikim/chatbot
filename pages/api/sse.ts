import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.query;

  if (!message) {
    res.status(400).json({ error: "Message query parameter is required" });
    return;
  }

  const apiKey = "8ebe92d279f268436d5e06e7aa4371a7ee21e3251aa543377a5ec5d316e9247d"; // Your Together.ai API key
  const url = "https://api.together.ai/v1/chat"; // Replace with the actual endpoint for Together.ai's chat API

  try {
    // Request to Together.ai API
    const response = await axios.post(
      url,
      {
        message: message,
        api_key: apiKey, // Pass your API key as part of the body
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Get the response from Together.ai
    const aiMessage = response.data.response; // Adjust based on the API response structure

    // Simulate a delay (optional)
    setTimeout(() => {
      res.status(200).json({ data: aiMessage });
    }, 1000);
  } catch (error) {
    console.error("Error fetching AI response:", error);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
}
