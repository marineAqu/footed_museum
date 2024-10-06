import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/PostList.module.css';

const PostList = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/Home');
    };

    const goToProfile = () => {
        navigate('/Profile');
    };

    const goBack = () => {
        navigate(-1);
    };

    const posts = [
        { title: '등록된 분실물 제목', status: '주웠어요/잃어버렸어요', category: '카테고리', image: './img/capybara.png' },
        { title: '등록된 분실물 제목', status: '주웠어요/잃어버렸어요', category: '카테고리', image: './img/lost_item_2.png' },
        { title: '등록된 분실물 제목', status: '주웠어요/잃어버렸어요', category: '카테고리', image: './img/lost_item_3.png' },
        { title: '등록된 분실물 제목', status: '주웠어요/잃어버렸어요', category: '카테고리', image: './img/lost_item_4.png' },
    ];

    return (
        <div className={styles.postList}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>{'<'}</button>
                <h1 className={styles.title}>등록글 목록</h1>
                <button className={styles.deleteButton}>삭제</button>
            </header>

            <div className={styles.content}>
                {posts.map((post, index) => (
                    <div key={index} className={styles.post}>
                        <div className={styles.postInfo}>
                            <h2>{post.title}</h2>
                            <p>{post.status} | {post.category}</p>
                        </div>
                        <div className={styles.postImage}>
                            <img src={post.image} alt="분실물"/>
                        </div>
                    </div>
                ))}
            </div>

            <nav className={styles.navbar}>
                <button className={styles.navButton} onClick={goToHome}>홈</button>
                <button className={styles.navButton}>지도</button>
                <button className={styles.navButton} onClick={goToProfile}>프로필</button>
            </nav>
        </div>
    );
};

export default PostList;