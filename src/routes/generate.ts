import { Router } from 'express';
import { z } from 'zod';
import { generateEmail } from '../services/openaiService.js';

const router = Router();

const schema = z.object({
  company: z.string().min(2),
  prospect: z.string().min(2),
  role: z.string().min(2),
  problem: z.string().min(5),
  valueProp: z.string().min(5),
  tone: z.enum(['friendly', 'formal', 'concise', 'bold']).optional()
});

router.post('/', async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
  }
  try {
    const result = await generateEmail(parsed.data);
    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Generation failed', message: err.message });
  }
});

export default router;
