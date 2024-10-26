import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/ProfileScreen.module.css';

const ProfileScreen = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/Home');
    };

    const goToPostList = () => {
        navigate('/PostList');
    };

    const goToQrManagement = () => {
        navigate('/QrManagement');  // QR 관리 화면으로 이동하는 함수
    };

    const goToMap = () => {
        navigate('/map');  // 지도 화면으로 이동하는 함수 추가
    };

    const goToChat = () => {
        navigate('/chat');  // 채팅 화면으로 이동
    };

    return (
        <div className={styles.profileScreen}>
            <header className={styles.header}>
                <button className={styles.topButton}>알림</button>
                <button className={styles.topButton}>설정</button>
            </header>

            <div className={styles.content}>
                <div className={styles.profileSection}>
                    <div className={styles.profileImage}>
                        <img src="profile-image-url" alt="프로필" />
                    </div>
                    <div className={styles.nickname}>닉네임</div>
                </div>

                <div className={styles.menuSection}>
                    <button className={styles.menuItem} onClick={goToPostList}>등록글 목록</button>
                    <button className={styles.menuItem}>키워드 알림 설정</button>
                    <button className={styles.menuItem} onClick={goToQrManagement}>QR 관리</button>
                </div>
            </div>

            <nav className={styles.navbar}>
                <button className={styles.navButton} onClick={goToHome}>홈</button>
                <button className={styles.navButton} onClick={goToMap}>지도</button>
                <button className={styles.navButton} onClick={goToChat}>채팅</button>
                <button className={styles.navButton}>프로필</button>
            </nav>
        </div>
    );
};

export default ProfileScreen;