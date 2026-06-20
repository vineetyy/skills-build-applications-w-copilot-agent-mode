import mongoose from 'mongoose';

export interface LeaderboardEntryDocument extends mongoose.Document {
  team: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardEntrySchema = new mongoose.Schema<LeaderboardEntryDocument>({
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() }
});

const LeaderboardEntry = mongoose.model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);
export default LeaderboardEntry;
