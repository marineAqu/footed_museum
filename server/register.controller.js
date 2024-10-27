const service = require('./service.js');
const qrCode = require("qrcode");
require('dotenv').config();
let multer = require("multer");
const chatService = require('./chat.service');

const upload = multer({
    dest: "uploads/"
});

class RegisterController {
    resister = async (req, res) => {
        //TODO: 프론트에서 keyword_id로 변경해서 전달해주거나 이 사이에서 keyword를 keyword_id로 변경하는 과정 추가 필요

        const getTemp = await service.postRegister(req.body.title, req.body.content, 1, 1);

        for (let i = 0; i < req.body.keywordId.length; i++)
            await service.postKeyword(req.body.postId, req.body.keywordId[i]);

        res.status(200).json({ getTemp });
    };

    reeealTemp = async (req, res) => {
        console.log("req: " + req.body);
        res.status(200).json({ message: "success" });
    }

    makeQrCode = async (req, res) => {
        const roomId = await chatService.findRoom(req.query.userid, 3);
        //console.log("roomId: " + JSON.stringify(roomId));
        const userUrl = "http://localhost:3000/chat/"+roomId.room_id;
        //const userUrl = "https://www.naver.com";

        console.log("userUrl: " + userUrl);

        qrCode.toDataURL(userUrl, (err, url) => {
            if (err) {
                console.error("QR코드 생성 실패: " + err);
                res.status(500).json({ error: "QR코드 생성 실패" });
                return;
            }

            res.status(200).json({ imgData: url });
        });
    };

    tempTestDir = async (req, res) => {

        const getTemp = await service.getTemp();

        console.log("res: " + JSON.stringify({ getTemp }));
        res.json({ getTemp });
    };
}

module.exports = RegisterController;