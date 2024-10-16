require('dotenv').config();
const qrCode = require('qrcode');
const mysql = require("mysql");

const connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

function makeQrCode(userUrl) {
    //TODO: QR코드 생성

}

module.exports = {
    makeQrCode
};