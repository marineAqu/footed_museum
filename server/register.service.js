require('dotenv').config();
const qrCode = require('qrcode');
const mysql = require("mysql");

const connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


function postRegister(userId, title, content, status) {
    return new Promise((resolve, reject) => {
        connect.query('INSERT INTO Posts (user_id, title, content, status) values (?, ?, ?, ?)',
            [userId, title, content, status],
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
    });
}

function postKeyword(id, keywordId) {
    return new Promise((resolve, reject) => {
        connect.query('INSERT INTO Category (post_id, category_id) values (?, ?)',
            [id, keywordId],
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
    });
}

module.exports = {
    postRegister,
    postKeyword
};