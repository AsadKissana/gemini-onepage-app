import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { sqaKnowledgeBase, systemInstructions } from "../../data/sqaKnowledgeBase";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  message: string;
  history: Message[];
};

type ChatResponse = {
  response: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ response: "", error: "Method not allowed" });
  }

  try {
  // Parse and validate incoming payload
  const { message, history }: ChatRequest = req.body;

    // Validate input
    if (!message || typeof message !== "string") {
      return res.status(400).json({ response: "", error: "Invalid message" });
    }

    // Read API key from server-only environment variables.
    // This ensures the key is never sent to the browser.
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY missing");
      return res.status(500).json({
        response: "",
        error: "Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file",
      });
    }

    // Build conversation contents for Gemini API
    const contents = [];
    
    // Add system instructions and knowledge base as the first user message
    contents.push({
      role: "user",
      parts: [{ 
        text: `${systemInstructions}\n\nKNOWLEDGE BASE:\n${sqaKnowledgeBase}\n\nRemember to use this knowledge base to provide accurate and detailed answers about Software Quality Assurance topics.` 
      }]
    });
    
    // Add initial model acknowledgment
    contents.push({
      role: "model",
      parts: [{ 
        text: "I understand. I am SQAI, your expert Software Quality Assurance consultant. I have access to comprehensive knowledge about testing methodologies, automation frameworks, QA processes, and best practices. I'm here to provide detailed, practical guidance on all aspects of software quality assurance. How can I help you today?" 
      }]
    });
    
    // Add conversation history
    history.forEach((msg) => {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      });
    });
    
    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Call Gemini API with reasonable timeout and handle its response shape
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const resp = await axios.post(
      endpoint,
      {
        contents,
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        },
      },
      { timeout: 15000 }
    );

    // Defensive: verify expected structure before accessing deep properties
    const candidate = resp?.data?.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;

    if (typeof text !== "string" || text.trim() === "") {
      console.warn("Gemini returned unexpected response", { data: resp?.data });
      return res.status(200).json({ response: "I couldn't generate a response. Please try again." });
    }

    return res.status(200).json({ response: text });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    
    // Handle specific error types
    if (error?.message?.includes("API_KEY_INVALID")) {
      return res.status(401).json({
        response: "",
        error: "Invalid API key. Please check your Gemini API key in .env.local",
      });
    }

    return res.status(500).json({
      response: "",
      error: error?.message || "An error occurred while processing your request",
    });
  }
}
