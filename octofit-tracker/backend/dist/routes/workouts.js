"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_, res) => {
    res.json({ workouts: [] });
});
router.post('/', (req, res) => {
    const workout = req.body;
    res.status(201).json({ workout });
});
exports.default = router;
