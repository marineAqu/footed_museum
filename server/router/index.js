const express = require('express');
const router = express.Router();

const userRouter = require('./register.router');
const chatRouter = require('./chat.router');
const memberRouter = require('./member.router');

router.use('/', userRouter);
router.use('/', chatRouter);
router.use('/', memberRouter);

module.exports = router;