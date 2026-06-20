"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const leaderboardEntrySchema = new mongoose_1.default.Schema({
    team: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Team', required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    updatedAt: { type: Date, default: () => new Date() }
});
const LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardEntrySchema);
exports.default = LeaderboardEntry;
