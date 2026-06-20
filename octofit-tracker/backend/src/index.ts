import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit';

app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected at ${mongoUri}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
  console.log(`Backend listening on http://localhost:${port}`);
});
