"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_, res) => {
    res.json({ teams: [] });
});
router.post('/', (req, res) => {
    const team = req.body;
    res.status(201).json({ team });
});
exports.default = router;
