import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  role: 'athlete' | 'coach';
  teams: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['athlete', 'coach'], default: 'athlete' },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  createdAt: { type: Date, default: () => new Date() }
});

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
