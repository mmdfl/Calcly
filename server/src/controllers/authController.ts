import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { pool } from '../utils/db.js';
import { signToken } from '../utils/jwt.js';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function signup(req: Request, res: Response) {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const { email, password } = parsed.data;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
      [email, passwordHash]
    );
    const token = signToken(result.rows[0].id);
    return res.status(201).json({ token });
  } catch {
    return res.status(409).json({ message: 'Email already exists' });
  }
}

export async function login(req: Request, res: Response) {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const { email, password } = parsed.data;
  const result = await pool.query('SELECT id, password_hash FROM users WHERE email = $1', [email]);

  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.json({ token: signToken(user.id) });
}
