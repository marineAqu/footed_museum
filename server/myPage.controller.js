const service = require('./myPage.service.js');
require('dotenv').config();

class myPageController {
    // 유저가 작성한 글 목록 조회
    getUserPosts = async (req, res) => {
        try {
            const userId = req.user.user_id;  // JWT에서 유저 정보 가져오기 (토큰 사용 시)

            const posts = await service.getUserPosts(userId);
            res.json({posts});
        } catch (error) {
            console.error("에러 발생: " + error);
            res.status(500).json({error: "서버 내부 오류 발생"});
        }
    };

    getUserNotifications = async (req, res) => {
        try {
            const userId = req.user.user_id;

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