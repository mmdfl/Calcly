import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import templateRoutes from './routes/templateRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);

export default app;
