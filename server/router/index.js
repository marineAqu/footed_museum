const express = require('express');
const router = express.Router();

const userRouter = require('./router');

router.use('/', userRouter);

module.exports = router;