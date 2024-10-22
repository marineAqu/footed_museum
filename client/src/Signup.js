import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Signup.module.css';

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [emailCheckResult, setEmailCheckResult] = useState('');
    const [isEmailChecked, setIsEmailChecked] = useState(false);

    const BackClick = () => {
        navigate('/');
    };

    // 이메일 중복 확인 요청
    const handleEmailCheck = async () => {
        try {
            const response = await fetch('/api/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            setEmailCheckResult(data.message);
            setIsEmailChecked(true); // 중복 체크 성공 시
        } catch (error) {
            setEmailCheckResult(error.message);
            setIsEmailChecked(false); // 중복된 이메일일 때
        }
    };

    // 회원가입 처리 요청
    const handleSignup = async (e) => {
        e.preventDefault();

        // 이메일 중복 확인이 되지 않았다면 회원가입 진행 불가
        if (!isEmailChecked) {
            alert('이메일 중복 확인을 해주세요.');
            return;
        }

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    user_name: userName,
                    password,
                    password_confirm: passwordConfirm,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            alert(data.message);

            // 회원가입 성공 후 홈으로 이동
            navigate('/Home');
        } catch (error) {
            alert('회원가입 실패: ' + error.message);
        }
    };


    return (
        <div className={styles.Signup}>
            <header className={styles.signupHeader}>
                <button onClick={BackClick} className={styles.backButton}>{'<'}</button>
                <h1>회원가입</h1>
            </header>
            <form className={styles.signupForm} onSubmit={handleSignup}>
                <div className={styles.inputGroup}>
                    <input className={styles.input} type="text" placeholder="아이디" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <button className={styles.checkButton} onClick={handleEmailCheck}>중복 확인</button>
                </div>
                {emailCheckResult && <p>{emailCheckResult}</p>} { /*이메일 중복 확인 결과 표시*/ }
                <input className={styles.input} type="text" placeholder="닉네임" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <input className={styles.input} type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input className={styles.input} type="password" placeholder="비밀번호 확인" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
                <button className={styles.signupButton} type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Signup;
