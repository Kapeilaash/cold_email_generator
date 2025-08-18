import { GenerateEmailRequest } from '../types/index.js';

export function generateTemplateVariants(data: GenerateEmailRequest) {
  const base = data.problem.split(' ')[0];
  return [
    `Question about ${base}`,
    `${data.company} & ${data.valueProp.split(' ')[0]}`,
    `${data.prospect.split(' ')[0]}, quick idea`,
    `Thought re: ${base}`
  ];
}
