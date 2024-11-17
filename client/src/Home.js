import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Home.module.css';
import SearchModal from './SearchModal.js';

const Home = () => {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [posts, setPosts] = useState([]); // 전체 게시글 데이터 저장
    const [error, setError] = useState(null); // 에러 메시지 저장
    const navigate = useNavigate();

    const openSearchModal = () => {
        setIsSearchModalOpen(true);  // 모달 열기
    };

    const closeSearchModal = () => {
        setIsSearchModalOpen(false);  // 모달 닫기
    };

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/item/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('전체 게시글 데이터를 불러오는 데 실패했습니다.');
            }

            const data = await response.json();
            setPosts(data.itemList); // 백엔드에서 가져온 게시글 데이터 저장
        } catch (error) {
            setError(error.message);
        }
    };

    // 페이지 로드 시 전체 게시글 데이터 가져오기
    useEffect(() => {
        fetchPosts();
    }, []);

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

    const goToChat = () => {
        navigate('/chat');  // 채팅 화면으로 이동
    };

    const goToItemDetail = (item) => {
        console.log('Navigating to item detail with:', item);
        navigate(`/item-detail/${item.post_id}`); // 상세 화면으로 이동, 선택한 항목 전달
    };

    return (
        <div className={styles.Home}>
            <header className={styles.header}>
                <button className={styles.searchButton} onClick={goToSearch}>검색</button>
                <button className={styles.writeButton} onClick={goToRegister}>글쓰기</button>
            </header>

            {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}

            <div className={styles.content}>
                {error ? (
                    <p className={styles.error}>{error}</p>
                ) : posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={index} className={styles.post} onClick={() => goToItemDetail(post)}>
                            <div className={styles.postInfo}>
                                <h2>{post.title}</h2>
                                <p>{post?.status === '1' ? '잃어버렸어요' : '주웠어요'}</p>
                                <p className={styles.postDate}>{post.post_date ? new Date(post.post_date).toLocaleDateString() : '날짜 정보 없음'}</p>
                            </div>
                            <img src={'https://storage.cloud.google.com/footed_museum/'+post.post_id+'.jpg' || 'default_image.png'} alt="분실물" className={styles.postImage} />
                        </div>
                    ))
                ) : (
                    <p className={styles.noPosts}>등록된 글이 없습니다.</p>
                )}
            </div>

            <nav className={styles.navbar}>
                <button className={styles.navButton}>홈</button>
                <button className={styles.navButton} onClick={goToMap}>지도</button>
                <button className={styles.navButton} onClick={goToChat}>채팅</button>
                <button className={styles.navButton} onClick={goToProfile}>프로필</button>
            </nav>
        </div>
    );
};

export default Home;

