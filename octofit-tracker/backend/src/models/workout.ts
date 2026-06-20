import mongoose from 'mongoose';

export interface WorkoutDocument extends mongoose.Document {
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: Date;
}

const workoutSchema = new mongoose.Schema<WorkoutDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  createdAt: { type: Date, default: () => new Date() }
});

const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);
export default Workout;
