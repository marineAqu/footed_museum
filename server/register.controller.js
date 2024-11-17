const service = require('./service.js');
const registerService = require('./register.service');
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
        const { userid, title, keyword, content, status } = await req.body;
        const result = await registerService.postRegister(userid, title, content, status, req.file);

        const keyword_arr = keyword.split(", ");
        console.log("keyword_arr: " + keyword_arr);

        for (let i = 0; i < keyword_arr.length; i++)
            await registerService.postKeyword(result, keyword_arr[i]);

        res.status(200).json({ message: "success" });
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

    visionAPI = async (req, res) => {

        if (!req.file) {
            console.log("No file uploaded");
            return res.status(400).json({ message: "No file uploaded" });
        }

        const object = await registerService.visionAPI(req.file.buffer);

        //console.log("object: " + JSON.stringify(object));

        res.json({ object });
    };
}

module.exports = RegisterController;