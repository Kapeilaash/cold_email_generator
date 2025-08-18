import { GenerateEmailRequest } from '../types/index.js';

export function buildPrompt(input: GenerateEmailRequest) {
  const tone = input.tone ?? 'friendly';
  return `You are an expert SaaS sales copywriter. Write a high-converting cold outbound email.

Rules:
- 60 word max body.
- Personalized and specific.
- Avoid buzzwords & fluff.
- Include a curiosity-driving subject line (<=6 words).
- CTA: ask for a quick call *without* using the word 'demo'.
- Tone: ${tone}.

Data:
Company: ${input.company}
Prospect: ${input.prospect}
Role: ${input.role}
Problem: ${input.problem}
Our Value Prop: ${input.valueProp}

Return JSON with keys: subject, email.`;
}
