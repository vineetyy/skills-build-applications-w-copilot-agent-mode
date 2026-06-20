"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_, res) => {
    res.json({ activities: [] });
});
router.post('/', (req, res) => {
    const activity = req.body;
    res.status(201).json({ activity });
});
exports.default = router;
