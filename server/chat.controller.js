const service = require('./chat.service.js');
require('dotenv').config();

class ChatController {
    chatlist = async (req, res) => {
        const chatlist = await service.chatlist(req.query.userid);

        res.status(200).json({ chatlist });
    };

    makeChatRoom = async (req, res) => {
        const makeNewChat = await service.makeNewRoom(req.body.user1id, req.body.user2id);

        res.status(200).json({ "status" : "success"});
    };

    getMessages = async (req, res) => {
        const { chatRoomId } = req.params;
        try {
            const messages = await service.getMessages(chatRoomId);
            console.log('messages: ', messages);
            res.status(200).json({ messages });
        } catch (error) {
            res.status(500).json({ error: "Failed to get messages" });
        }
    };

}

module.exports = ChatController;