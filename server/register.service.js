require('dotenv').config();
const qrCode = require('qrcode');
const mysql = require("mysql");
const { Storage } = require("@google-cloud/storage");
const path = require('path');

const storage = new Storage({
    keyFilename: path.join(__dirname, './key.json'), // JSON 키 파일 경로
});
const bucketName = 'footed_museum';

const connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

async function uploadFileToGCS(file, postid) {
    const bucket = storage.bucket(bucketName);
    const gcsFileName = postid + '.jpg';
    const blob = bucket.file(gcsFileName);
    const blobStream = blob.createWriteStream({
        resumable: false,
    });

    new Promise((resolve, reject) => {
        blobStream.on('error', (err) => {
            console.error('GCS Upload Error:', err);
            reject(err);
        });

        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${gcsFileName}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer); // 버퍼에 담긴 파일 데이터 업로드
    });
}

async function postRegister(userId, title, content, status, img) {
    try {
        const insertId = await new Promise((resolve, reject) => {
            connect.query(
                'INSERT INTO Posts (user_id, title, content, status) VALUES (?, ?, ?, ?)',
                [userId, title, content, status],
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.insertId);
                    }
                }
            );
        });

        if (img) {
            await uploadFileToGCS(img, insertId); // 이미지 업로드가 완료되기를 기다림
        }

        return insertId; // insertId 반환
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러 발생 시 throw로 전달
    }
}


function postKeyword(postid, keyword) {
    connect.query('SELECT count(category_name) as count from categories where category_name = ?',
        [keyword],
        function (error, result) {
        console.log("result[0].count "+result[0].count);
            if(result[0].count === 0){
                console.log('postKeyword 안에서 keyword: ', keyword);

                connect.query('INSERT INTO Categories (category_name) values (?)',
                    [keyword],
                    function (error, result) {
                        if (error) {
                            console.error('Error:', error);
                        }
                        else{
                            connect.query('INSERT INTO postcategory (post_id, category_id) values (?, ?)',
                                [postid, result.insertId],
                                function (error, result) {
                                    if (error) {
                                        console.error('Error:', error);
                                    }
                                });
                        }
                    });
            }
        });

    /* return new Promise((resolve, reject) => {
        connect.query('INSERT INTO Categories (post_id, category_id) values (?, ?)',
            [id, keywordId],
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
    });
     */
}

async function visionAPI(img){
    const vision = require('@google-cloud/vision');
    const {Translate} = require('@google-cloud/translate').v2;

    // client 생성
    const visionClient = new vision.ImageAnnotatorClient({
       keyFilename: './key.json'
    });

    //객체 인식
    const [result] = await visionClient.objectLocalization({ image: { content: img.toString('base64') } });
    //const labels = result.labelAnnotations;
    const labels = result.localizedObjectAnnotations;
    console.log('object:');
    labels.forEach(label => console.log(label.name));

    //번역
    const transClient = new Translate({
        keyFilename: './key.json'
    });

    // 모든 label.name을 번역
    const translated = await Promise.all(
        labels.map(async (label) => {
            const [translatedName] = await transClient.translate(label.name, {from: 'en', to: 'ko'});
            return translatedName;
        })
    );
    console.log("translated: "+translated);

    return translated;
}

module.exports = {
    postRegister,
    postKeyword,
    visionAPI
};