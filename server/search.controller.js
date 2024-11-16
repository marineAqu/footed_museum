const service = require('./search.service.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();


class searchController {

    getAllItems = async (req, res) => {
        try {
            const itemList = await service.getAllItems();
            res.json({ itemList });
        } catch (error) {
            console.error("에러 발생: " + error);
            res.status(500).json({error: "서버 내부 오류 발생"});
        }
    };

    // 카테고리별 상세 조회 API
    searchItems = async (req, res) => {
        try {
            const {category_id, location, temp_keyword} = req.query;

            // category_id를 배열로 받으면 JSON 파싱
            const categories = category_id ? JSON.parse(category_id) : null;

            // "입력" 카테고리가 포함되었는지 확인
            const includesInput = categories && categories.includes('입력');

            // "입력"이라는 키워드가 있으면 전체 조회 실행
            if (includesInput && temp_keyword) {
                const itemList = await service.searchItemsByKeyword(temp_keyword);
                res.json({itemList});
            } else {
                const itemList = await service.searchItemsByFilters(categories, location, temp_keyword);
                res.json({itemList});
            }
        } catch (error) {
            console.error("에러 발생: " + error);
            res.status(500).json({error: "서버 내부 오류 발생"});
        }
    };

    getItemDetail = async (req, res) => {
        const { postId } = req.params;

        try {
            const itemDetail = await service.getItemDetailById(postId);

            if (!itemDetail) {
                return res.status(404).json({ error: '해당 게시글을 찾을 수 없습니다.' });
            }

            res.json(itemDetail);
        } catch (error) {
            console.error("에러 발생:", error);
            res.status(500).json({ error: "서버 내부 오류 발생" });
        }
    };

    getUserPosts = async (req, res) => {
        console.log('요청 수신: /api/PostList');
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('Authorization 헤더 없음');
            return res.status(401).json({ error: '인증 헤더가 제공되지 않았습니다.' });
        }

        const token = authHeader.split(' ')[1];
        console.log('JWT 토큰:', token);

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('디코딩된 토큰:', decoded);

            if (!decoded || !decoded.userId) {
                console.log('유효하지 않은 토큰');
                return res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
            }

            const userId = decoded.userId;
            console.log('받은 userId:', userId);

            const posts = await service.getUserPosts(userId);
            console.log('DB에서 반환된 데이터:', posts);

            res.json({ itemList: posts });
        } catch (error) {
            console.error('서버 오류:', error);
            res.status(500).json({ error: '서버 내부 오류 발생' });
        }
    };
}

module.exports = searchController;