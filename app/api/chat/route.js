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

/* OPEN API */

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {

  try {

    const body = await req.json();
    const message = body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: message }
      ]
    });

    return Response.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {

    console.error("API ERROR:", error);

    if (error.status === 429) {
      return Response.json({
        reply: "AI service limit reached. Please try again later."
      });
    }

    return Response.json({
      reply: "Server error occurred."
    });

  }

}

/*
Huggingface API
export async function POST(req) {

  const { message } = await req.json();

  const response = await fetch(
    "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: message
      })
    }
  );

  const data = await response.json();

  return Response.json({
    reply: data.generated_text || "No response"
  });
}*/