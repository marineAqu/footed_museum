import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Home.module.css';
import SearchModal from './SearchModal.js';

const Home = () => {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const navigate = useNavigate();

    const openSearchModal = () => {
        setIsSearchModalOpen(true);  // 모달 열기
    };

    const closeSearchModal = () => {
        setIsSearchModalOpen(false);  // 모달 닫기
    };

    const posts = [
        //예시 게시글들 fetch로 api따오면이렇게되겟죠
        {
            title: '에어팟 찾아요ㅠㅠ',
            status: '잃어버렸어요',
            date: '2024-09-01', 
            image: 'item1.png',
        },
        {
            title: '체크카드 주웠습니다.',
            status: '주웠어요',
            date: '2024-09-02',
            image: 'item2.png',
        },
        {
            title: '혹시 카드 보신 분!!',
            status: '잃어버렸어요',
            date: '2024-09-04', 
            image: 'item4.png',
        },
        {
            title: '마루인형키링 주운 사람..',
            status: '잃어버렸어요',
            date: '2024-09-05', 
            image: 'item5.png',
        },
        {
            title: '틴트 보신 분 계신가요?',
            status: '잃어버렸어요',
            date: '2024-09-06', 
            image: 'item6.png',
        },
        {
            title: '버즈 찾아요.',
            status: '잃어버렸어요',
            date: '2024-09-07', 
            image: 'item7.png',
        },
    ];

    const goToProfile = () => {
        navigate('/Profile');
    };

    const goToRegister = () => {
        navigate('/Register'); // 글쓰기 버튼 클릭 시 등록 화면으로 이동
    };

    const goToSearch = () => {
        navigate('/search');  // 검색 버튼 클릭 시 /search 경로로 이동
    };

    const goToMap = () => {
        navigate('/map');  // 지도 화면으로 이동
    };

    const goToItemDetail = (item) => {
        navigate('/item-detail', { state: item }); // 상세 화면으로 이동, 선택한 항목 전달
    };


    return (
        <div className={styles.Home}>
            <header className={styles.header}>
                <button className={styles.searchButton} onClick={goToSearch}>검색</button>
                <button className={styles.writeButton} onClick={goToRegister}>글쓰기</button>
            </header>

            {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}

            <div className={styles.content}>
                {posts.map((post, index) => (
                    <div key={index} className={styles.post}  onClick={() => goToItemDetail(post)}>
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
                <button className={styles.navButton} onClick={goToMap}>지도</button>
                <button className={styles.navButton} onClick={goToProfile}>프로필</button>
            </nav>

        </div>
    );
};

export default Home;
