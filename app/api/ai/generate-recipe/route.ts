import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import prisma from '@/lib/db/db';
import fs from 'fs';
import path from 'path';


const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const systemPrompt = fs.readFileSync(
  path.join(process.cwd(), 'app/lib/system_prompt'),
  'utf-8'
);

export async function POST(req: NextRequest) {
  const { prompt, chatSessionId } = await req.json();

  try {
    const response = await anthropic.messages.create({
			model: 'claude-3-7-sonnet-20250219',
			system: systemPrompt,
			max_tokens: 1024,
			messages: [
				{
					role: 'user',
					content: prompt,
				},
			],
		});
      
		const contentBlock = response.content.find(
			(block) => block.type === 'text'
		);
		
		const recipe = contentBlock && 'text' in contentBlock ? contentBlock.text : '';

		// Recipe looks like this:
		// {
		// 	"id": "...",
		// 	"model": "claude-3-7-sonnet-20250219",
		// 	"role": "assistant",
		// 	"content": [
		// 		{
		// 			"type": "text",
		// 			"text": "Here's your smoothie recipe..."
		// 		}
		// 	],
		// 	...
		// }
		

    // Save Message 
    await prisma.message.create({
      data: {
        chat_session_id: chatSessionId,
        user_query: prompt,
        ai_response: recipe,
      },
    });

    return NextResponse.json({ recipe });
  } catch (err) {
    console.error('Claude or DB error:', err);
    return new NextResponse('Failed to generate recipe', { status: 500 });
  }
}
