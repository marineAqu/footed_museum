require('dotenv').config();
const jwt = require('jsonwebtoken');
const mysql = require("mysql");

const connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// JWT 인증 미들웨어
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: '토큰이 없습니다.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: '토큰이 유효하지 않습니다.' });
        }
        req.user = user;
        next();
    });
};


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
            // JWT 토큰 생성
            const token = jwt.sign(
                { user_id: user.user_id, email: user.email, user_name: user.user_name },
                process.env.JWT_SECRET, // JWT_SECRET은 환경 변수에 설정되어 있어야 함
                { expiresIn: '1h' } // 토큰은 1시간 후 만료됨
            );

            callback(null, {
                message: '로그인 성공',
                token, // 토큰을 프론트엔드에 반환
                user: {user_id: user.user_id, email: user.email, user_name: user.user_name}
            });
        } else {
            callback(null, {error: '이메일 또는 비밀번호가 올바르지 않습니다.'});
        }
    });
}

module.exports = {
    authenticateToken,
    checkEmail,
    signUp,
    logIn
};