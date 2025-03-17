
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: [
        {
          role: 'system',
          content: 'You are a skilled comedian AI programmed to generate customized jokes based on user preferences. Generate a joke that perfectly fits these criteria. Ensure it is engaging, entertaining, and aligns with the selected tone and type. If a pun is selected, incorporate a clever wordplay; if it’s a story, build a short and funny narrative; if it’s a knock-knock joke, structure it properly with a punchline. Keep the joke short and snappy unless the type requires otherwise. Avoid offensive or inappropriate humor. Display the joke as the final output.',
        },
        ...messages,
      ],
  });

  return result.toDataStreamResponse();
}