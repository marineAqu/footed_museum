import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Login.module.css';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const BackClick = () => {
        navigate('/');
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // 페이지 리로딩 방지

        try {
            // fetch로 로그인 요청 보내기
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }


            const data = await response.json();
            console.log('data', data);
            const token = data.token;
            const userId = data.user.user_id;

            console.log('저장될 user_id:', userId);
            localStorage.setItem('token', token); // JWT 토큰 저장
            localStorage.setItem('user_id', userId);

            console.log('user_id 저장:', localStorage.getItem('user_id'));
            console.log('keys', Object.keys(localStorage));

            // 로그인 성공 시 홈으로 이동
            navigate('/Home');
        } catch (error) {
            setError('로그인 실패: ' + error.message); // 오류 메시지 처리
        }
    };

    return (
        <div className={styles.Login}>
            <header className={styles.loginHeader}>
                <button onClick={BackClick} className={styles.backButton}>{'<'}</button>
                <h1 className={styles.title}>로그인</h1>
            </header>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <input type="text" placeholder="아이디" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="비밀번호" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className={styles.submitButton}>로그인</button>
            </form>
        </div>
    );
};

export default Login;
