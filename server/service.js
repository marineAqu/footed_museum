// service.js
require('dotenv').config();
const mysql = require("mysql");

const connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


connect.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류:', err);
        throw err;
    }
    console.log('MySQL 연결 성공');
});

function getTemp() {
    return new Promise((resolve, reject) => {
        connect.query('select adddate(curdate(),1) as today',
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
    });
}

function postRegister(title, content, imgUrl, keyword) {
    return new Promise((resolve, reject) => {
        connect.query('INSERT INTO Posts (title, content) values (?, ?)',
            [title, content],
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
    });
}

//이메일 중복 방지
function checkEmail(email, callback) {
    const emailCheckQuery = 'SELECT * FROM Users WHERE email = ?';
    connect.query(emailCheckQuery, [email], (err, results) => {
        if (err) return callback(err);
        if (results.length > 0) {
            return callback(null, {error: '이미 사용 중인 이메일입니다.'});
        }
        callback(null, {message: '사용 가능한 이메일입니다.'});
    });
}

//회원가입
function signUp(user_name, email, password, callback) {
    // 이메일 중복 체크
    const emailCheckQuery = 'SELECT * FROM Users WHERE email = ?';
    connect.query(emailCheckQuery, [email], (err, results) => {
        if (err) return callback(err);
        if (results.length > 0) {
            return callback(null, {error: '이미 등록된 이메일입니다.'});
        }

        // 새 사용자 등록
        const query = 'INSERT INTO Users (user_name, email, password) VALUES (?, ?, ?)';
        connect.query(query, [user_name, email, password], (err, result) => {
            if (err) return callback(err);
            callback(null, {message: '회원가입 성공'});
        });
    });
}

//로그인
function logIn(email, password, callback) {
    const query = 'SELECT * FROM Users WHERE email = ?';
    connect.query(query, [email], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) {
            return callback(null, {error: '이메일 또는 비밀번호가 올바르지 않습니다.'});
        }

        const user = results[0];

        // 비밀번호 확인
        if (password === user.password) {
            callback(null, {
                message: '로그인 성공',
                user: {user_id: user.user_id, email: user.email, user_name: user.user_name}
            });
        } else {
            callback(null, {error: '이메일 또는 비밀번호가 올바르지 않습니다.'});
        }
    });
}

module.exports = {
    getTemp,
    postRegister,
    checkEmail,
    signUp,
    logIn
};