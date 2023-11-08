import { NextResponse } from "next/server";
import { z } from "zod";

const contentSchmea = z.object({
  type: z.string(),
  text: z.string().optional(),
  image_url: z.string().optional(),
});

const messageSchema = z.object({
  role: z.string(),
  content: z.array(contentSchmea),
});

const chatRequestSchema = z.object({
  model: z.string(),
  messages: z.array(messageSchema),
});

export async function POST(request: Request) {
  const requestBody = await request.json();
  const parsedRequest = chatRequestSchema.safeParse(requestBody);

  if (!parsedRequest.success) {
    return NextResponse.json({ message: "Invalid schema", success: false });
  }
}
