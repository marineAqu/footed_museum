const express = require('express');
const memberRouter = express.Router();
const cors = require('cors');
memberRouter.use(cors());
const MemberController = require('../member.controller');
const memberController = new MemberController();
const { authenticateToken } = require('../member.service');

memberRouter.post("/api/login", memberController.login);
memberRouter.post("/api/Signup", memberController.signUp);
memberRouter.post("/api/check-email", memberController.emailCheck);

memberRouter.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: '이곳은 보호된 라우트입니다.', user: req.user });
});

module.exports = memberRouter;