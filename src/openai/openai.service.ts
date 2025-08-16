import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async reviewCode(code: string) {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a senior software engineer reviewing code. Always return JSON with fields: explanation, issues, suggestions.'
        },
        {
          role: 'user',
          content: `Review this code and return JSON:
  \`\`\`
  ${code}
  \`\`\`
  Example:
  {
    "explanation": "What the code does",
    "issues": ["List of issues or code smells"],
    "suggestions": ["List of improvement suggestions"]
  }`
        }
      ],
    });
  
    const text = response.choices[0].message?.content ?? '{}';
  
    // Try to parse JSON safely
    try {
      return JSON.parse(text);
    } catch (err) {
      return { explanation: text, issues: [], suggestions: [] };
    }
  }
  
}
