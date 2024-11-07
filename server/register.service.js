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

async function visionAPI(img){
    const vision = require('@google-cloud/vision');

    // client 생성
    const client = new vision.ImageAnnotatorClient({
       keyFilename: './key.json'
    });

    const [result] = await client.objectLocalization({ image: { content: img.toString('base64') } });
    //const labels = result.labelAnnotations;
    const labels = result.localizedObjectAnnotations;
    console.log('object:');
    labels.forEach(label => console.log(label.name));
}

module.exports = {
    postRegister,
    postKeyword,
    visionAPI
};