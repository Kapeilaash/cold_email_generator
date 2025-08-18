import assert from 'node:assert/strict';
import { buildPrompt } from '../utils/prompt.js';

const prompt = buildPrompt({
  company: 'Acme',
  prospect: 'Jane Doe',
  role: 'CTO',
  problem: 'High infrastructure costs',
  valueProp: 'Cost optimization platform',
  tone: 'friendly'
});

assert.ok(prompt.includes('Acme'));
assert.ok(prompt.includes('Jane Doe'));
assert.ok(prompt.includes('High infrastructure costs'));
