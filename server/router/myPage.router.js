const express = require('express');
const myPageRouter = express.Router();
const cors = require('cors');
myPageRouter.use(cors());
const MyPageController = require('../myPage.controller');
const myPageController = new MyPageController();
const { authenticateToken } = require('../member.service');

/*
//등록글 조회
myPageRouter.get('/api/myPage/posts', authenticateToken, myPageController.getUserPosts);

//알림 조회
myPageRouter.get('/api/myPage/notifications', authenticateToken, myPageController.getUserNotifications);
*/

myPageRouter.get('/api/myPage/posts', myPageController.getUserPosts);
myPageRouter.get('/api/myPage/notifications', myPageController.getUserNotifications);


module.exports = myPageRouter;


