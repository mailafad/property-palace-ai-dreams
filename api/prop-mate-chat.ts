// api/prop-mate-chat.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBZ3Jit0dXfhOFPM9gtA0v9BT4GNzTy4A4";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { message, history } = req.body;

  // Step 1: If user asks for property listings, fetch from DB (MVP: just fetch all)
  if (message && /buy|rent|property|house|flat|apartment|villa|listings/i.test(message)) {
    try {
      // Dynamically import property fetcher to avoid ESM/CJS issues
      const { fetchProperties } = await import('../src/contexts/property/propertyApi');
      const properties = await fetchProperties();
      const top3 = properties.slice(0, 3);
      const reply = `Here are some properties you might like:\n` +
        top3.map((p: any, i: number) =>
          `${i + 1}. ${p.title} in ${p.city} - ₹${p.price}\n${p.address}`
        ).join('\n\n');
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Transfer-Encoding', 'chunked');
      for (const char of reply) {
        await new Promise((r) => setTimeout(r, 10));
        res.write(char);
      }
      res.end();
      return;
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch properties" });
      return;
    }
  }

  // Step 2: Otherwise, use Gemini API for AI chat
  try {
    const prompt = `You are PropMate AI, a smart real estate assistant for Indian users. Respond conversationally and helpfully. User: ${message}`;
    const geminiRes = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await geminiRes.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content?.parts?.[0]?.stringValue ||
      data?.candidates?.[0]?.content?.text ||
      "Sorry, I couldn't find an answer.";
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    for (const char of text) {
      await new Promise((r) => setTimeout(r, 10));
      res.write(char);
    }
    res.end();
  } catch (e) {
    res.status(500).json({ error: "AI chat failed" });
  }
}