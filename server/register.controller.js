const service = require('./service.js');
require('dotenv').config();

class RegisterController {
    resister = async (req, res) => {
        //TODO: 프론트에서 keyword_id로 변경해서 전달해주거나 이 사이에서 keyword를 keyword_id로 변경하는 과정 추가 필요

        const getTemp = await service.postRegister(req.body.title, req.body.content, 1, 1);

        for (let i = 0; i < req.body.keywordId.length; i++)
            await service.postKeyword(req.body.postId, req.body.keywordId[i]);

        res.status(200).json({ getTemp });
    };
}

module.exports = RegisterController;