import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './css/ItemDetail.module.css';

const ItemDetail = () => {
    const { postId } = useParams(); // URL에서 postId 가져오기
    const navigate = useNavigate();

    const [itemDetail, setItemDetail] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postId) {
            setError('유효하지 않은 요청입니다.');
            return;
        }

        const fetchItemDetail = async () => {
            try {
                const response = await fetch(`/api/item/detail/${postId}`); // 백엔드 API 호출
                if (!response.ok) {
                    throw new Error('상세 정보를 가져오는 데 실패했습니다.');
                }
                const data = await response.json();
                setItemDetail(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchItemDetail();
    }, [postId]);

    const goBack = () => {
        navigate(-1);
    };

    const goToChat = () => {
        navigate('/chat/:ID');
    };

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!itemDetail) {
        return <div className={styles.loading}>로딩 중...</div>;
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>&lt; </button>
                <span className={styles.title}>
                {itemDetail?.title || '제목 없음'} {/* 제목이 없을 때 기본값 */}
            </span>
            </header>
            <div className={styles.content}>
                <img
                    src={'https://storage.cloud.google.com/footed_museum/'+postId+'.jpg' || 'default_image.png'} // 이미지가 없을 때 기본 이미지 사용(예시)
                    alt={itemDetail?.title || '이미지'}
                    className={styles.itemImage}
                />
                <p>{itemDetail?.status === '1' ? '잃어버렸어요' : '주웠어요'}</p> {/* 상태 표시 */}
                <p>{itemDetail?.date || '날짜 정보 없음'}</p> {/* 날짜 표시 */}

                {/* 키워드들 출력 */}
                <div className={styles.keywordButtons}>
                    {itemDetail?.keywords && Array.isArray(itemDetail.keywords) && itemDetail.keywords.length > 0 ? (
                        itemDetail.keywords.map((keyword, index) => (
                            <button key={index} className={styles.keywordButton}>
                                {keyword}
                            </button>
                        ))
                    ) : (
                        <p className={styles.keywordButtons}>키워드가 없습니다.</p>
                    )}
                </div>

                <div className={styles.details}>
                    <p>{itemDetail?.content || '상세 설명이 없습니다.'}</p> {/* 상세 설명 표시 */}
                </div>
                <button className={styles.actionButton} onClick={goToChat}>채팅 걸기</button>
            </div>
        </div>
    );

};

export default ItemDetail;


