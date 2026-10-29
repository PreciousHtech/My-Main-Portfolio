import { Router, Request, Response, NextFunction } from 'express';
import { GitHubService } from '../services/github.js';

const router = Router();

// GET /api/projects - list portfolio projects
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await GitHubService.fetchProjects();
    res.json({
      success: true,
      data: projects
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:name - get project details with README
router.get('/:name', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.params;
    const project = await GitHubService.fetchProjectByName(name);

    if (!project) {
      res.status(404).json({
        success: false,
        error: {
          message: `Project '${name}' not found`,
          code: 'NOT_FOUND'
        }
      });
      return;
    }

    res.json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
});

export default router;
