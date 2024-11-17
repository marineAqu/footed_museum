import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/PostList.module.css';

const PostList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    const goToHome = () => {
        navigate('/Home');
    };

    const goToProfile = () => {
        navigate('/Profile');
    };

    const goBack = () => {
        navigate(-1);
    };

    const goToItemDetail = (item) => {
        console.log('Navigating to item detail with:', item);
        navigate(`/item-detail/${item.post_id}`); // 상세 화면으로 이동, 선택한 항목 전달
    };

    // Fetch posts from backend
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log('keys', Object.keys(localStorage));
                const userIdFromStorage = localStorage.getItem('user_id');
                console.log('userId:', userIdFromStorage);
                if (!userIdFromStorage) {
                    throw new Error('로그인이 필요합니다. user_id가 없습니다.');
                }

                const response = await fetch(`/api/myPage/posts?user_id=${userIdFromStorage}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                console.log('받은 데이터:', data);
                setPosts(data.posts);
            } catch (err) {
                console.error('Failed to fetch posts:', err);
                setError('Failed to load posts. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.postList}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>{'<'}</button>
                <h1 className={styles.title}>등록글 목록</h1>
                <button className={styles.deleteButton}>삭제</button>
            </header>

            <div className={styles.content}>
                {posts.map((post) => (
                    <div key={post.post_id} className={styles.post} onClick={() => goToItemDetail(post)}>
                        <div className={styles.postInfo}>
                            <h2>{post.title}</h2>
                            <p>
                                {post?.status === '1' ? '잃어버렸어요' : '주웠어요'}
                                {` | ${post.location || '장소 없음'}`}
                            </p>
                        </div>
                        <div className={styles.postImage}>
                            <img src={'https://storage.cloud.google.com/footed_museum/'+post.post_id+'.jpg' || './img/default_image.png'} alt="분실물" className={styles.postImage}/>
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