import mongoose from 'mongoose';

export interface TeamDocument extends mongoose.Document {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new mongoose.Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
});

const Team = mongoose.model<TeamDocument>('Team', teamSchema);
export default Team;
