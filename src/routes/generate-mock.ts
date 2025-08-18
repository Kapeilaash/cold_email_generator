import { Router } from 'express';
import { z } from 'zod';
import { generateEmailMock } from '../services/mockService.js';

const router = Router();
const schema = z.object({
  company: z.string(),
  prospect: z.string(),
  role: z.string(),
  problem: z.string(),
  valueProp: z.string(),
  tone: z.enum(['friendly', 'formal', 'concise', 'bold']).optional()
});

router.post('/', async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
  }
  const result = await generateEmailMock(parsed.data);
  res.json(result);
});

export default router;
