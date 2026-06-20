import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
import { connectDatabase } from './config/database';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

const codespaceApiHost = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : null;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (_, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running.',
    health: '/health',
    apiBase: '/api'
  });
});

app.get('/health', (_, res) => {
  res.json({ status: 'ok', apiUrl: codespaceApiHost ?? `http://localhost:${port}` });
});

export async function startServer() {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
    if (codespaceApiHost) {
      console.log(`Codespaces API URL: ${codespaceApiHost}`);
    }
  });
}

export default app;
