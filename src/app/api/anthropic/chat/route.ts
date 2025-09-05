import { anthropic } from "@ai-sdk/anthropic";
import { convertToCoreMessages, streamText } from "ai";
import { rateLimit, getClientIP, chatMessageSchema, validateInput } from "@/lib/utils/validation";

export const runtime = "edge";

// Simple API key authentication for now
const VALID_API_KEY = process.env.INTERNAL_API_KEY || 'aptly-api-key-change-in-production';

export async function POST(req: Request) {
  try {
    // API Key Authentication
    const apiKey = req.headers.get('x-api-key');
    const authHeader = req.headers.get('authorization');
    
    // Check for API key or Bearer token
    if (!apiKey && !authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authentication credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Validate API key
    if (apiKey && apiKey !== VALID_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Invalid API key" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Validate Bearer token (simplified for now)
    if (authHeader && !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: "Invalid authorization format" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    // Rate limiting
    const clientIP = getClientIP(req);
    const rateLimitPassed = await rateLimit(
      `anthropic_${clientIP}`, 
      parseInt(process.env.API_RATE_LIMIT_PER_MINUTE || "10"),
      60000
    );

    if (!rateLimitPassed) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    // Input validation
    const body = await req.json();
    const validatedInput = validateInput(chatMessageSchema, body) as any;

    // API key validation
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("Anthropic API key not configured");
    }

    const result = await streamText({
      model: anthropic("claude-3-5-sonnet-20240620"),
      messages: convertToCoreMessages(validatedInput.messages),
      system: "You are a helpful AI assistant specialized in digital learning and Meta certification preparation.",
      maxTokens: 1000,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Anthropic API error:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}
