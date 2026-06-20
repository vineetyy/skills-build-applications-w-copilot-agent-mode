import express from 'express';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
import { connectDatabase, getDatabaseUri } from './config/database';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

const codespaceApiHost = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : null;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/health', (_, res) => {
  res.json({ status: 'ok', apiUrl: codespaceApiHost ?? `http://localhost:${port}` });
});

app.listen(port, async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  console.log(`Backend listening on http://localhost:${port}`);
  if (codespaceApiHost) {
    console.log(`Codespaces API URL: https://${codespaceApiHost}`);
  }
});
