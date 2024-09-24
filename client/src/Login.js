import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './css/Login.module.css'; 

const Login = () => {
    const navigate = useNavigate(); 

    const BackClick = () => {
        navigate('/'); 
    };
    const LoginClick= () => {
        navigate('/Home');
    }

    return (
        <div className={styles.Login}>
            <header className={styles.loginHeader}>
                <button onClick={BackClick} className={styles.backButton}>{'<'}</button>
                <h1 className={styles.title}>로그인</h1>
            </header>
            <form className={styles.loginForm}>
                <input type="text" placeholder="아이디" className={styles.input}/>
                <input type="password" placeholder="비밀번호" className={styles.input}/>
                <button type="submit" onClick={LoginClick} className={styles.submitButton}>로그인</button>
            </form>
        </div>
    );
};

export default Login;
