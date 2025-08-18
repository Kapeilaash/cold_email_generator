import { Router } from 'express';
import generate from './generate.js';
import generateMock from './generate-mock.js';
import variants from './variants.js';

const api = Router();
api.use('/generate', generate);
api.use('/generate-mock', generateMock);
api.use('/variants', variants);

export default api;
