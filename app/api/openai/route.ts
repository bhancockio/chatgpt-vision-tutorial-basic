import axios from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for text content
const textContentSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
});

// Define the schema for image content (no need to define if not used yet)
const imageContentSchema = z.object({
  type: z.literal("image_url"),
  image_url: z.object({
    url: z.string().url(),
  }),
});

// Create a union of text and image content schemas
const contentSchema = z.union([textContentSchema, imageContentSchema]);

// Define the schema for a message
const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.array(contentSchema),
});

// Define the schema for the chat request
const chatRequestSchema = z.object({
  messages: z.array(messageSchema),
});

const OPENAI_URL = "https://api.openai.com/v1/chat/completions" as const;

export async function POST(request: Request) {
  const requestBody = await request.json();
  const parsedRequest = chatRequestSchema.safeParse(requestBody);

  if (!parsedRequest.success) {
    console.log("Invalid schema", parsedRequest.error);
    return NextResponse.json({ error: "Invalid schema", success: false });
  }

  // Clone the messages and replace image URLs with a placeholder
  const clonedMessages = parsedRequest.data.messages.map((message) => ({
    ...message,
    content: message.content.map((content) => {
      if (content.type === "image_url") {
        return {
          type: content.type,
          image_url: {
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
          },
        };
      }
      return content;
    }),
  }));

  console.log("clonedMessages", JSON.stringify(clonedMessages));

  const payload = {
    model: "gpt-4-vision-preview",
    messages: clonedMessages,
    max_tokens: 300,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  await axios
    .post(OPENAI_URL, payload, { headers })
    .then((response) => {
      console.log("response", response.data);
    })
    .catch((error) => {
      console.log("error");
    });

  const message = {
    role: "assistant",
    content:
      "This image features a beautiful natural landscape under a blue sky with scattered clouds. In the foreground, there is a wooden boardwalk or path that stretches straight ahead into the distance. The boardwalk is surrounded by lush, green grass and various vegetation on either side. In the background, you can see a line of trees and shrubs. The scenery suggests a peaceful, outdoor setting, likely a park, nature reserve, or a wetland area where the boardwalk is provided to allow people to walk through without disturbing the natural environment. The lighting and conditions suggest it is a sunny day with good weather.",
  };

  return NextResponse.json({ success: true, message });
}
