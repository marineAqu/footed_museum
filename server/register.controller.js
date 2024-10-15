const service = require('./service.js');
const qrCode = require("qrcode");
require('dotenv').config();
let multer = require("multer");

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


    makeQrCode = async (req, res) => {

        //const userUrl = req.body.url;
        const userUrl = "https://www.naver.com";

        qrCode.toDataURL(userUrl, (err, url) => {
            if (err) {
                console.error("QR코드 생성 실패: " + err);
                res.status(500).json({ error: "QR코드 생성 실패" });
                return;
            }

            res.status(200).json({ imgData: url });
        });
/*
        qrCode.toDataURL(userUrl, (err, url) => {
            const img = new Buffer.from(url, "base64");

            if (err) {
                console.error("QR코드 생성 실패: " + err);
                throw err;
            }
            res.writeHead(200, {
                "Content-Type": "image/png",
                "Content-Length": img.length
            });

            res.end(img);

            //TODO: QR코드 이미지 저장

        });
 */
    };

    tempTestDir = async (req, res) => {

        const getTemp = await service.getTemp();

        console.log("res: " + JSON.stringify({ getTemp }));
        res.json({ getTemp });
    };
}

module.exports = RegisterController;