const express = require('express');
const chatRouter = express.Router();
const cors = require('cors');
chatRouter.use(cors());
const ChatController = require('../chat.controller');
const chatController = new ChatController();

chatRouter.get("/chat/lists", chatController.chatlist);
chatRouter.get("/chat/make_rooms", chatController.makeChatRoom);
chatRouter.post("/chat/send_message", chatController.sendMessage);
chatRouter.get("/chat/get_messages", chatController.getMessages);

module.exports = chatRouter;