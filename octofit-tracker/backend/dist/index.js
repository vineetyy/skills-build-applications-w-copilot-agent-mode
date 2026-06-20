"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit';
const codespaceApiHost = process.env.CODESPACE_NAME
    ? `${process.env.CODESPACE_NAME}-8000.${process.env.CODESPACE_NAME}.githubpreview.dev`
    : null;
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/health', (_, res) => {
    res.json({ status: 'ok', apiUrl: codespaceApiHost ?? `http://localhost:${port}` });
});
app.listen(port, async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log(`MongoDB connected at ${mongoUri}`);
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
    }
    console.log(`Backend listening on http://localhost:${port}`);
    if (codespaceApiHost) {
        console.log(`Codespaces API URL: https://${codespaceApiHost}`);
    }
});
