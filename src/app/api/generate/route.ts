import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const { systemPrompt, userPrompts } = await req.json();

    // Create a chat instance with the system prompt
    const chat = genAI.chats.create({
      model: "gemini-2.0-flash",
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
      ],
    });

    // Process each prompt and collect responses
    const responses = [];

    // Handle case when userPrompts is a single string
    if (typeof userPrompts === "string") {
      const response = await chat.sendMessage({
        message: userPrompts,
      });
      responses.push(response.text);
    }
    // Handle case when userPrompts is an array
    else if (Array.isArray(userPrompts)) {
      // Process each prompt sequentially to maintain context
      for (const prompt of userPrompts) {
        const response = await chat.sendMessage({
          message: prompt,
        });
        responses.push(response.text);
      }
    }

    return NextResponse.json({ responses });
  } catch (error) {
    console.error("GenAI request error:", error);
    return NextResponse.json(
      { error: "An error occurred processing your request" },
      { status: 500 }
    );
  }
}
