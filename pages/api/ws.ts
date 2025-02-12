import { WebSocketServer, WebSocket } from "ws";
import { NextApiRequest, NextApiResponse } from "next";
import { IncomingMessage } from "http";
import OpenAI from "openai";

// OpenAI API setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// Global WebSocket server to prevent multiple instances
const wsServerGlobal = (global as any).wsServer || null;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket) {
    res.status(500).json({ error: "WebSocket upgrade not supported." });
    return;
  }

  // Use type assertion to ensure `res.socket` has `server`
  const socketWithServer = res.socket as any;

  if (!wsServerGlobal) {
    const wsServer = new WebSocketServer({ noServer: true });

    // ✅ Explicitly define types for request, socket, and head
    socketWithServer.server.on("upgrade", (request: IncomingMessage, socket: any, head: Buffer) => {
      wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit("connection", ws, request);
      });
    });

    wsServer.on("connection", (socket: WebSocket) => {
      console.log("Client connected");

      socket.on("message", async (message: string) => {
        console.log("User input:", message);

        try {
          // Call OpenAI API and stream response
          const stream = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: message }],
            stream: true,
          });

          for await (const chunk of stream) {
            if (chunk.choices[0]?.delta?.content) {
              socket.send(chunk.choices[0].delta.content);
            }
          }
          socket.send("__END__"); // Mark end of response
        } catch (error) {
          console.error("OpenAI API error:", error);
          socket.send("Error: Unable to generate response.");
        }
      });

      socket.on("close", () => console.log("Client disconnected"));
    });

    (global as any).wsServer = wsServer;
  }

  res.end();
}
