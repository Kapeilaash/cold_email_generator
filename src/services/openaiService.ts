import OpenAI from 'openai';
import { buildPrompt } from '../utils/prompt.js';
import { GenerateEmailRequest, GeneratedEmailResponse } from '../types/index.js';

let client: OpenAI | null = null;
function getClient() {
  if (client) return client;
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY');
  }
  client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

export async function generateEmail(data: GenerateEmailRequest): Promise<GeneratedEmailResponse> {
  const prompt = buildPrompt(data);
  const started = Date.now();
  const api = getClient();
  const completion = await api.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You output strictly valid JSON.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  });
  const latencyMs = Date.now() - started;
  const choice = completion.choices[0];
  let parsed: any;
  try {
    parsed = JSON.parse(choice.message?.content || '{}');
  } catch (e) {
    parsed = { subject: 'Follow up', email: choice.message?.content || '' };
  }
  return {
    subject: parsed.subject || 'Quick question',
    email: parsed.email || parsed.body || '',
    tokensUsed: completion.usage?.total_tokens,
    model: completion.model,
    latencyMs
  };
}
