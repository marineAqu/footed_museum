//server.js
const express = require('express');
const app = express();
const service = require('./service.js');
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const test = require('./Router/router');

app.use('/api', test);

const port = 3002; //node 서버가 사용할 포트 번호

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.get('/temp', async (req, res) => {
    try {
        const getTemp = await service.getTemp();

        console.log("res: " + JSON.stringify({ getTemp }));
        res.json({ getTemp });
    } catch (error) {
        console.error("에러 발생: " + error);
        res.status(500).json({ error: "서버 내부 오류 발생" });
    }
});

// 이메일 중복 체크 API
app.post('/api/check-email', (req, res) => {
    const { email } = req.body;

    // 이메일 중복 체크
    service.checkEmail(email, (err, result) => {
        if (err) {
            console.error("에러 발생: " + err);
            return res.status(500).json({ error: '서버 오류' });
        }
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.json({ message: result.message });
    });
});

// 회원가입
app.post('/api/Signup', (req, res) => {
    const { email, user_name, password, password_confirm } = req.body;

    // 비밀번호 확인
    if (password !== password_confirm) {
        return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    // 회원가입 처리
    service.signUp(user_name, email, password, (err, result) => {
        if (err) {
            console.error("에러 발생: " + err);
            return res.status(500).json({ error: '서버 오류' });
        }
        res.status(201).json({ message: result.message });
    });
});



// 로그인
app.post('/api/login', (req, res) => {
    const {email, password} = req.body;

    service.logIn(email, password, (err, result) => {
        if (err) {
            console.error("에러 발생: " + err);
            return res.status(500).json({error: '서버 오류'});
        }
        if (result.error) {
            return res.status(401).json({error: result.error});
        }
        res.json({message: result.message, user: result.user});
    });
});
