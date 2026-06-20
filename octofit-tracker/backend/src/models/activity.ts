import mongoose from 'mongoose';

export interface ActivityDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  type: string;
  distanceKm: number;
  durationMinutes: number;
  caloriesBurned: number;
  occurredAt: Date;
}

const activitySchema = new mongoose.Schema<ActivityDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  occurredAt: { type: Date, required: true }
});

const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);
export default Activity;
