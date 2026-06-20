import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard';

const router = Router();

router.get('/', async (_, res) => {
  const leaderboard = await LeaderboardEntry.find().lean();
  res.json({ leaderboard });
});

export default router;
