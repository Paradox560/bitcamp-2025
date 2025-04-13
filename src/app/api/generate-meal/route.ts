import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `You are a nutritionist and a culinary master. You are given a list of foods that your client can eat, 
    and each item in the list contains the food name, the serving size, the calories per serving, the fat per serving, the carbs
    per serving, and the protein per serving. Please create 1 meal from this given food list. You should calculate the total calories,
    total fat, total carbs, and the total protein of the meal based on the number of servings you’re recommending and the calories, fat,
    carbs, and protein per serving. You should create a name for this meal, a one sentence description, and specify each food you used
    in the meal, and the serving size, total calories, fat, carbs, and protein. We will also give you the number of calories, fat, carbs,
    and protein the user wants to eat for this meal. Please make your meal’s total calories, fat, carbs, and protein come as close to
    possible as what the user wants to eat with it serving as a lower bound. Please limit yourself to only using a maximum of 7 ingredients.
    For each food, specify how many calories, fat, carbs, and protein the total serving.
    When responding to future queries, you MUST return in the following JSON format, no other comments necessary:`,
});

const generationConfig = {
  temperature: 0.35,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function POST(req: NextRequest) {
  try {
    const { userPrompt } = await req.json();

    const chat = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: userPrompt }],
        },
      ],
    });

    const result = await chat.sendMessage(userPrompt);
    const response = result.response.text();

    return NextResponse.json(JSON.parse(response));
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong processing the request." },
      { status: 500 }
    );
  }
}
