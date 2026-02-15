import type { Response } from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { pool } from '../utils/db.js';
import type { AuthRequest } from '../middleware/auth.js';

const templateSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(''),
  formula: z.string().min(1),
  variables: z.record(z.string())
});

export async function createTemplate(req: AuthRequest, res: Response) {
  const parsed = templateSchema.safeParse(req.body);
  if (!parsed.success || !req.userId) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const { name, description, formula, variables } = parsed.data;
  const shareId = randomUUID();
  const result = await pool.query(
    `INSERT INTO templates (user_id, name, description, formula, variables, share_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [req.userId, name, description, formula, JSON.stringify(variables), shareId]
  );

  return res.status(201).json(result.rows[0]);
}

export async function listTemplates(req: AuthRequest, res: Response) {
  const result = await pool.query('SELECT * FROM templates WHERE user_id = $1 ORDER BY created_at DESC', [
    req.userId
  ]);
  return res.json(result.rows);
}

export async function updateTemplate(req: AuthRequest, res: Response) {
  const parsed = templateSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const existing = await pool.query('SELECT * FROM templates WHERE id = $1 AND user_id = $2', [
    req.params.id,
    req.userId
  ]);

  if (!existing.rows[0]) {
    return res.status(404).json({ message: 'Template not found' });
  }

  const source = existing.rows[0];
  const next = { ...source, ...parsed.data };
  const result = await pool.query(
    `UPDATE templates SET name=$1, description=$2, formula=$3, variables=$4 WHERE id=$5 RETURNING *`,
    [next.name, next.description, next.formula, JSON.stringify(next.variables), req.params.id]
  );

  return res.json(result.rows[0]);
}

export async function getSharedTemplate(req: AuthRequest, res: Response) {
  const result = await pool.query('SELECT * FROM templates WHERE share_id = $1', [req.params.shareId]);
  if (!result.rows[0]) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.json(result.rows[0]);
}
