import { Router } from 'express';
import { z } from 'zod';
import { generateTemplateVariants } from '../services/templateService.js';

const router = Router();
const schema = z.object({
  company: z.string(),
  prospect: z.string(),
  role: z.string(),
  problem: z.string(),
  valueProp: z.string(),
  tone: z.enum(['friendly', 'formal', 'concise', 'bold']).optional()
});

router.post('/', (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });
  res.json({ subjects: generateTemplateVariants(parsed.data) });
});

export default router;
