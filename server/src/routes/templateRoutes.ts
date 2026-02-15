import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  createTemplate,
  getSharedTemplate,
  listTemplates,
  updateTemplate
} from '../controllers/templateController.js';

const router = Router();

router.get('/share/:shareId', getSharedTemplate);
router.use(authMiddleware);
router.post('/', createTemplate);
router.get('/', listTemplates);
router.put('/:id', updateTemplate);

export default router;
