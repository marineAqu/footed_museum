import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Signup.module.css'; 

const Signup = () => {
    const navigate = useNavigate();

    const BackClick = () => {
        navigate('/'); 
    };

    return (
        <div className={styles.Signup}>
            <header className={styles.signupHeader}>
                <button onClick={BackClick} className={styles.backButton}>{'<'}</button>
                <h1>회원가입</h1>
            </header>
            <form className={styles.signupForm}>
                <div className={styles.inputGroup}>
                    <input className={styles.input} type="text" placeholder="아이디" />
                    <button className={styles.checkButton}>중복 확인</button>
                </div>
                <input className={styles.input} type="text" placeholder="닉네임" />
                <input className={styles.input} type="password" placeholder="비밀번호" />
                <input className={styles.input} type="password" placeholder="비밀번호 확인" />
                <button className={styles.signupButton} type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Signup;
