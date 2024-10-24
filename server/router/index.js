const express = require('express');
const router = express.Router();

const userRouter = require('./register.router');
const chatRouter = require('./chat.router');
const memberRouter = require('./member.router');
const searchRouter = require('./search.router');

router.use('/', userRouter);
router.use('/', chatRouter);
router.use('/', memberRouter);
router.use('/', searchRouter);

module.exports = router;