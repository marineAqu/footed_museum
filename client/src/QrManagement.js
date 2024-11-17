import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/QrManagement.module.css';

const QrManagement = () => {
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try{
                const token = localStorage.getItem("token");

                const response = await fetch("/api/protected", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                });

                const result = await response.json();
                const myId = result.user.user_id;

                // TODO
                //  ChatScreen에도 useEffect에 기본적으로 select해서 대화기록 불러오되 나, 혹은 상대 id가 3(unknown)이면 불러오지않기로
                //  회원가입시에 자동으로 unknown과 채팅창 생성해야함
                //  그리고 ChatScreen 에는 보안 기능 추가해야됨 a, b가 아닌 타인이 여기 들어오면안되니까 (이건 중간평가 이후에 ......................)

                const QRresponse = await fetch('/tempmakeQr?userid=' + myId);
                const qrdata = await QRresponse.json();
                setImgSrc(qrdata.imgData);

            }catch (error){
                console.error('로그인 정보 에러: ', error);
            }
        };

        fetchData();
    }, []);

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
                        {<img src="QR.png" alt="현재 QR" />}
                        {imgSrc && <img src={imgSrc} alt="현재 QR" />}
                    </div>
                    <div className={styles.currentQr}> </div>
                </div>
                <button className={styles.saveButton}>이미지로 저장</button>
                </div>
            </div>
    );
};

export default QrManagement;
