import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './css/ItemDetail.module.css';

const ItemDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, status, date, image, keywords } = location.state; // keywords 추가

    const goBack = () => {
        navigate(-1);
    };

    const goToChat = () => {
        navigate('/chat/:ID');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>&lt; </button>
                <span className={styles.title}>{title}</span> {/* 분실물 제목 */}
            </header>
            <div className={styles.content}>
                <img src={image} alt={title} className={styles.itemImage} />
                <p>{status}</p>
                <p>{date}</p>

                {/* 키워드들 출력 */}
                <div className={styles.keywordButtons}>
                    {keywords.map((keyword, index) => (
                        <button key={index} className={styles.keywordButton}>
                            {keyword}
                        </button>
                    ))}
                </div>

                <div className={styles.details}>
                    <p>기타 상세 설명</p>
                </div>
                <button className={styles.actionButton} onClick={goToChat}>채팅 걸기</button>
            </div>
        </div>
    );
};

export default ItemDetail;
