import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Home.module.css';

const Home = () => {
    const navigate = useNavigate();

    const posts = [
        //예시 게시글들 fetch로 api따오면이렇게되겟죠
        {
            title: '분실물 제목 1',
            status: '잃어버렸어요',
            date: '2024-09-01', 
            image: './img/capybara.png',
        },
        {
            title: '분실물 제목 2',
            status: '주웠어요',
            date: '2024-09-02',
            image: 'image_url_2.jpg',
        },
        {
            title: '분실물 제목 4',
            status: '잃어버렸어요',
            date: '2024-09-04', 
            image: 'image_url_4.jpg',
        },
        {
            title: '분실물 제목 5',
            status: '잃어버렸어요',
            date: '2024-09-05', 
            image: 'image_url_5.jpg',
        },
        {
            title: '분실물 제목 6',
            status: '잃어버렸어요',
            date: '2024-09-06', 
            image: 'image_url_6.jpg',
        },
        {
            title: '분실물 제목 7',
            status: '잃어버렸어요',
            date: '2024-09-07', 
            image: 'image_url_7.jpg',
        },
    ];

    const goToProfile = () => {
        navigate('/Profile');
    };

    const goToRegister = () => {
        navigate('/Register'); // 글쓰기 버튼 클릭 시 등록 화면으로 이동
    };


    return (
        <div className={styles.Home}>
            <header className={styles.header}>
                <button className={styles.searchButton}>검색</button>
                <button className={styles.writeButton} onClick={goToRegister}>글쓰기</button>
            </header>
            <div className={styles.content}>
            {posts.map((post, index) => (
                    <div key={index} className={styles.post}>
                        <div className={styles.postInfo}>
                            <h2>{post.title}</h2>
                            <p>{post.status}</p>
                            <p className={styles.postDate}>{post.date}</p>
                        </div>
                        <img src={post.image} alt="분실물" className={styles.postImage} />
                    </div>
                ))}
            </div>
            <nav className={styles.navbar}>
                <button className={styles.navButton}>홈</button>
                <button className={styles.navButton}>지도</button>
                <button className={styles.navButton} onClick={goToProfile}>프로필</button>
            </nav>
        </div>
    );
};

export default Home;
