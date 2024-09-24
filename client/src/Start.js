import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './css/Start.module.css';

function Start() {
  const navigate = useNavigate();
  const LoginClick = () => {
    navigate('/login'); 
  };
  const SignupClick = () => {
    navigate('/Signup'); 
  };

  return (
    <div className={styles.start}>
      <div className={styles.logo}>
        <img src="logo.png" alt="로고" />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.loginButton} onClick={LoginClick}>로그인</button>
        <button className={styles.signupButton} onClick={SignupClick}>회원가입</button>
      </div>
    </div>
  );
}

export default Start;