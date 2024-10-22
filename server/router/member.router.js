const express = require('express');
const memberRouter = express.Router();
const cors = require('cors');
memberRouter.use(cors());
const MemberController = require('../member.controller');
const memberController = new MemberController();

memberRouter.post("/api/login", memberController.login);
memberRouter.post("/api/Signup", memberController.signUp);
memberRouter.post("/api/check-email", memberController.emailCheck);

module.exports = memberRouter;