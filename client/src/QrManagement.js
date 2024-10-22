import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/QrManagement.module.css';

const QrManagement = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.Home}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>&lt;</button>
                <span className={styles.title}>QR 관리</span>
            </header>
            <div className={styles.qrManagement}>
                <div className={styles.qrContainer}>
                    <div className={styles.qrImage}>

                        <img src="QR.png" alt="현재 QR" />
                    </div>
                    <div className={styles.currentQr}> </div>
                </div>
                <button className={styles.saveButton}>이미지로 저장</button>
                <button className={styles.issueButton}>재발급</button>
                <div className={styles.expiration}>
                    재발급까지 남은 기간
                </div>
            </div>
        </div>
    );
};

export default QrManagement;
