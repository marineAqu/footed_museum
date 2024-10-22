const service = require('./member.service.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class MemberController {

    // 회원가입
    signUp = async (req, res) => {
        const {email, user_name, password, password_confirm} = req.body;

        // 비밀번호 확인
        if (password !== password_confirm) {
            return res.status(400).json({error: '비밀번호가 일치하지 않습니다.'});
        }

        // 회원가입 처리
        service.signUp(user_name, email, password, (err, result) => {
            if (err) {
                console.error("에러 발생: " + err);
                return res.status(500).json({error: '서버 오류'});
            }
            res.status(201).json({message: result.message});
        });
    };


    // 로그인
    login = async (req, res) => {
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
    };

    // 이메일 중복 체크 API
    emailCheck = async (req, res) => {
        const {email} = req.body;

        // 이메일 중복 체크
        service.checkEmail(email, (err, result) => {
            if (err) {
                console.error("에러 발생: " + err);
                return res.status(500).json({error: '서버 오류'});
            }
            if (result.error) {
                return res.status(400).json({error: result.error});
            }
            res.json({message: result.message});
        });
    };
}

module.exports = MemberController;