"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceApiHost = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : null;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
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
async function startServer() {
    try {
        await (0, database_1.connectDatabase)();
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
    }
    app.listen(port, () => {
        console.log(`Backend listening on http://localhost:${port}`);
        if (codespaceApiHost) {
            console.log(`Codespaces API URL: ${codespaceApiHost}`);
        }
    });
}
exports.default = app;
