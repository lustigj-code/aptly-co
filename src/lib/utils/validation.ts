import { z } from "zod";
import { checkRateLimit } from './rate-limit';
import { sanitizeText, sanitizeJson } from './sanitize';

// Legacy rate limiting function - now uses distributed rate limiting
export async function rateLimit(
  identifier: string,
  limit: number = 60,
  windowMs: number = 60000
): Promise<boolean> {
  const result = await checkRateLimit(identifier, limit, windowMs);
  return result.success;
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return "unknown";
}

// Input validation schemas
export const chatMessageSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant", "system"]),
    content: z.string().min(1).max(4000),
  })).min(1).max(50),
}) as any;

export const imageGenerationSchema = z.object({
  prompt: z.string().min(3).max(500),
  model: z.string().optional(),
});

export const transcriptionSchema = z.object({
  audio: z.string().min(1),
  format: z.enum(["webm", "mp3", "wav"]).optional(),
});

export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    // Sanitize the input before validation
    const sanitizedData = sanitizeJson(data);
    return schema.parse(sanitizedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.errors.map(e => e.message).join(", ")}`);
    }
    throw error;
  }
}