import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// OpenAI API setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const userMessage = req.query.message as string;
  if (!userMessage) {
    res.status(400).write("data: Error: Message is required\n\n");
    res.end();
    return;
  }

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: userMessage }],
      stream: true, // Enable streaming
    });

    for await (const chunk of stream) {
      if (chunk.choices[0]?.delta?.content) {
        res.write(`data: ${chunk.choices[0].delta.content}\n\n`);
      }
    }
    res.write("data: __END__\n\n"); // Mark end of response
    res.end();
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.write("data: Error: Unable to generate response\n\n");
    res.end();
  }
}
