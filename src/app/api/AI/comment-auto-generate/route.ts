import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { match } from "ts-pattern";

// Create an OpenAI API client (that's edge friendly!)

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  });

  if (!process.env.OPENAI_API_KEY) {
    return new Response("Missing OPENAI_API_KEY", { status: 400 });
  }

  const { editorContent } = await req.json();
  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are an AI writing assistant helping students with their university application essays.
        You must respond in the following JSON format:
        {
          "comments": [
            {
              "sentence": "original sentence from essay",
              "comment": "your comment about this sentence",
              "type": "suggestion" | "praise" | "correction"
            }
          ]
        }
        Keep comments concise and constructive. Do not include any text outside of this JSON structure.`
      },
      {
        role: "user",
        content: "This is the content of the essay: " + editorContent + ". Please analyze the essay and provide comments in the specified JSON format."
      }
    ],
    stream: false,
    response_format: { type: "json_object" }
  });

  return new Response(response.choices[0].message.content);
}
