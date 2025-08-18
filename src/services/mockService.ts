import { GenerateEmailRequest, GeneratedEmailResponse } from '../types/index.js';
import { buildPrompt } from '../utils/prompt.js';

export async function generateEmailMock(data: GenerateEmailRequest): Promise<GeneratedEmailResponse> {
  // Simulate generation without API cost
  const prompt = buildPrompt(data);
  return {
    subject: 'Exploring ' + data.problem.split(' ')[0] + '?',
    email: `Hi ${data.prospect.split(' ')[0]},\n\nNoticed ${data.company} might be facing ${data.problem}. We help with ${data.valueProp}. Worth a quick 10-min chat next week?\n\n(${prompt.length} chars prompt)\n\nBest,\nYou`,
    model: 'mock',
    tokensUsed: Math.round(prompt.length / 4),
    latencyMs: 5
  };
}
