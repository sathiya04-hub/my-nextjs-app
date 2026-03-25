/*export async function POST(req) {
  const { message } = await req.json();

  let reply = "I don't understand.";

  if (message.toLowerCase().includes("hello")) {
    reply = "Hi there!";
  } else if (message.toLowerCase().includes("name")) {
    reply = "I am a Next.js chatbot.";
  } else if (message.toLowerCase().includes("help")) {
    reply = "How can I help you today?";
  }

  return Response.json({ reply });
}*/

/* OpenRouter API */

import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo", // free/cheap models available
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    if (error.status === 429) {
      return Response.json({
        reply: "⚠️ Free limit reached. Try again later.",
      });
    }

    return Response.json({
      reply: "Server error",
    });
  }
}
