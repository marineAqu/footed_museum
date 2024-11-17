const service = require('./myPage.service.js');
require('dotenv').config();

class myPageController {
    // 유저가 작성한 글 목록 조회
    getUserPosts = async (req, res) => {
        try {
            const userId = req.query.user_id;
            console.log('받은 user_id:', userId);
            if (!userId) {
                return res.status(400).json({ error: 'user_id가 필요합니다.' });
            }

            const posts = await service.getUserPosts(userId);
            console.log('조회된 posts:', posts);
            res.json({posts});
        } catch (error) {
            console.error("에러 발생: " + error);
            res.status(500).json({error: "서버 내부 오류 발생"});
        }
    };

    getUserNotifications = async (req, res) => {
        try {
            const userId = req.query.user_id;
            if (!userId) {
                return res.status(400).json({ error: 'user_id가 필요합니다.' });
            }

            const postNotifications = await service.getPostNotifications(userId);
            const chatNotifications = await service.getChatNotifications(userId);
            const keywordNotifications = await service.getKeywordNotifications(userId);

            const notifications = [
                ...postNotifications,
                ...chatNotifications,
                ...keywordNotifications
            ];

            res.json({notifications});
        } catch (error) {
            console.error("에러 발생: " + error);
            res.status(500).json({error: "서버 내부 오류 발생"});
        }
    };
}

module.exports = myPageController;