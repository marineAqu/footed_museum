/*
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './css/SearchResults.module.css';

const posts = [
    // 예시 게시글들
    {
        title: '에어팟 찾아요',
        status: '잃어버렸어요',
        date: '2024-09-01',
        image: 'item1.png',
        keywords: ['이어폰', '검정', 'IT']
    },
    {
        title: '체크카드 주웠습니다.',
        status: '주웠어요',
        date: '2024-09-02',
        image: 'item2.png',
        keywords: ['카드', '노랑', '학생회관']
    },
    {
        title: '혹시 카드 보신 분!!',
        status: '잃어버렸어요',
        date: '2024-09-04',
        image: 'item4.png',
        keywords: ['카드', '파랑', '인문대']
    },
    {
        title: '마루인형키링 주운 사람..',
        status: '잃어버렸어요',
        date: '2024-09-05',
        image: 'item5.png',
        keywords: ['인형', '마루', '학생회관']
    },
    {
        title: '틴트 보신 분 계신가요?',
        status: '잃어버렸어요',
        date: '2024-09-06',
        image: 'item6.png',
        keywords: ['틴트', '빨간', '법정대']
    },
    {
        title: '버즈 찾아요.',
        status: '잃어버렸어요',
        date: '2024-09-07',
        image: 'item7.png',
        keywords: ['이어폰', '보라', '미래']
    },
];

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { keywords } = location.state; // 전달받은 키워드들

    // 게시물 필터링 - 키워드가 포함된 게시물만 반환
    const filteredPosts = posts.filter(post =>
        keywords.some(keyword => post.keywords.includes(keyword))
    );

    const goBack = () => {
        navigate(-1);
    };

    const handleDoubleClick = (post) => {
        // navigate로 상세 페이지로 이동하고 선택된 게시물의 정보 전달
        navigate('/item-detail', { state: post });
    };

    return (
        <div className={styles.resultsContainer}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>&lt;</button>
                <span className={styles.title}>검색 결과</span>
            </header>
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                    <div
                        key={index}
                        className={styles.resultItem}
                        onDoubleClick={() => handleDoubleClick(post)} // 더블 클릭 시 상세 페이지로 이동
                    >
                        <img src={post.image} alt={post.title} className={styles.resultImage}/>
                        <h3>{post.title}</h3>
                        <p>{post.status}</p>
                        <p>{post.date}</p>
                    </div>
                ))
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </div>
    );
};

export default SearchResults;
 */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './css/SearchResults.module.css';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { category_id, location: locationFilter, temp_keyword } = location.state || {};
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const queryParams = new URLSearchParams();

                if (category_id) queryParams.append('category_id', JSON.stringify(category_id));
                if (locationFilter) queryParams.append('location', locationFilter);
                if (temp_keyword) queryParams.append('temp_keyword', temp_keyword);

                const response = await fetch(`/api/item/search?${queryParams.toString()}`);

                if (!response.ok) {
                    throw new Error('검색 결과를 가져오는 데 실패했습니다.');
                }

                const data = await response.json();
                setFilteredPosts(data.itemList);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchSearchResults();
    }, [category_id, locationFilter, temp_keyword]);

    const goBack = () => {
        navigate(-1);
    };

    const handleDoubleClick = (post) => {
        navigate(`/item-detail/${post.post_id}`);
    };

    return (
        <div className={styles.resultsContainer}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>&lt;</button>
                <span className={styles.title}>검색 결과</span>
            </header>
            {error ? (
                <p className={styles.error}>{error}</p>
            ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                    <div
                        key={index}
                        className={styles.resultItem}
                        onDoubleClick={() => handleDoubleClick(post)}
                    >
                        <img src={'https://storage.cloud.google.com/footed_museum/'+post.post_id+'.jpg' || 'default_image.png'} alt={post.title} className={styles.resultImage}/>
                        <h3>{post.title}</h3>
                        <p>{post.status === '1' ? '잃어버렸어요' : '주웠어요'}</p>
                        <p className={styles.postDate}>{post.post_date ? new Date(post.post_date).toLocaleDateString() : '날짜 정보 없음'}</p>
                    </div>
                ))
            ) : (
                <p className={styles.noResults}>검색 결과가 없습니다.</p>
            )}
        </div>
    );
};

export default SearchResults;

