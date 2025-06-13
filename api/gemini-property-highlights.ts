import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = "AIzaSyBZ3Jit0dXfhOFPM9gtA0v9BT4GNzTy4A4";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { description, location } = req.body;
  if (!description) {
    res.status(400).json({ error: "Missing property description" });
    return;
  }

  const prompt = `
You are a real estate market expert. Given the following property details, analyze and provide strong selling points and highlights, considering current market trends and the growth of the area. Do not start your response with generic phrases like "Sure," "Here are," or "As an AI." Go straight to the highlights.

Property Details:
${description}
${location ? "\nLocation: " + location : ""}
`;

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    console.log("Gemini API raw response:", JSON.stringify(data));
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content?.parts?.[0]?.stringValue ||
      data?.candidates?.[0]?.content?.text ||
      "No highlights generated.";
    // Remove common AI intro phrases if present
    const cleaned = text.replace(/^(Sure,|Here are|As an AI|AI:|Highlights:|Property highlights:|Some highlights:|The highlights:|Key highlights:|Strong points:|)/i, '').trim();
    res.status(200).json({ highlights: cleaned, debug: data });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate highlights" });
  }
}