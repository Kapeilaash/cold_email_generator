import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import api from './routes/index.js';
import { rateLimit } from './utils/rateLimit.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', rateLimit({ windowMs: 60_000, max: 20 }));
app.use(express.static('public'));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use('/api', api);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`Cold Email Generator API listening on :${port}`);
});
