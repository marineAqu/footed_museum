const service = require('./search.service.js');
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
            const {category_id} = req.query;

            // category_id들을 배열로 받으면 JSON 파싱
            let categories = JSON.parse(category_id);

            // "입력" 카테고리가 포함되었는지 확인
            const includesInput = categories.includes('입력');

            // "입력"이라는 키워드가 있으면 전체 조회 실행
            if (includesInput && temp_keyword) {
                const itemList = await service.searchItemsByKeyword(temp_keyword);
                res.json({itemList});
            } else {
                // 그 외의 경우, 선택된 category_id들로 필터링
                const itemList = await service.searchItemsByCategory(categories);
                res.json({itemList});
            }
        } catch (error) {
            console.error("에러 발생: " + error);
            res.status(500).json({error: "서버 내부 오류 발생"});
        }
    };
}

module.exports = searchController;