export interface GenerateEmailRequest {
  company: string;
  prospect: string;
  role: string;
  problem: string;
  valueProp: string;
  tone?: 'friendly' | 'formal' | 'concise' | 'bold';
}

export interface GeneratedEmailResponse {
  subject: string;
  email: string;
  tokensUsed?: number;
  model?: string;
  latencyMs?: number;
}
