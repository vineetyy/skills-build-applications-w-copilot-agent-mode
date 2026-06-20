import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Workout from '../models/workout';

const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri, { connectTimeoutMS: 10000 });

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.create([
    { name: 'Maya Larson', email: 'maya@octofit.com', role: 'athlete' },
    { name: 'Noah Patel', email: 'noah@octofit.com', role: 'athlete' },
    { name: 'Zoe Kim', email: 'zoe@octofit.com', role: 'coach' }
  ]);

  const teams = await Team.create([
    { name: 'Peak Performers', description: 'Team focused on endurance and consistency', members: [users[0]._id, users[1]._id] },
    { name: 'Cardio Crushers', description: 'High-energy cardiovascular training group', members: [users[0]._id] }
  ]);

  await User.updateMany({ _id: { $in: teams[0].members } }, { $set: { teams: [teams[0]._id] } });
  await User.updateMany({ _id: { $in: teams[1].members } }, { $set: { teams: [teams[1]._id] } });

  const activities = await Activity.create([
    { user: users[0]._id, type: 'Run', distanceKm: 8.2, durationMinutes: 52, caloriesBurned: 640, occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { user: users[1]._id, type: 'Cycle', distanceKm: 24.5, durationMinutes: 70, caloriesBurned: 820, occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 36) }
  ]);

  const workouts = await Workout.create([
    { title: 'Strength Builder', description: 'A balanced strength routine with upper and lower body movements.', durationMinutes: 45, difficulty: 'Intermediate' },
    { title: 'Recovery Flow', description: 'Low-impact mobility and recovery workout for post-training adaptation.', durationMinutes: 30, difficulty: 'Beginner' }
  ]);

  await LeaderboardEntry.create([
    { team: teams[0]._id, score: 1245, rank: 1 },
    { team: teams[1]._id, score: 978, rank: 2 }
  ]);

  console.log('Inserted sample data:');
  console.log(` users: ${users.length}`);
  console.log(` teams: ${teams.length}`);
  console.log(` activities: ${activities.length}`);
  console.log(` workouts: ${workouts.length}`);

  const leaderboardCount = await LeaderboardEntry.countDocuments();
  console.log(` leaderboard entries: ${leaderboardCount}`);

  await mongoose.disconnect();
  console.log('Database seed complete.');
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
