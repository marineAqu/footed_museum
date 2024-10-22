import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/SearchModal.module.css';

const SearchModal = ({ onClose }) => {
    const navigate = useNavigate();
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState({ 물건: false, 색상: false, 장소: false });
    const [options] = useState({
        물건: ['지갑', '이어폰', '카드', '기타', '입력'],
        색상: ['빨강', '파랑', '검정', '흰색', '노랑', '초록', '보라'],
        장소: ['자연과학', '법정', 'IT', '종강', '미래', '인문', '글경', '공대', '학생회관', '도서관']
    });


    const addKeyword = (keyword) => {
        if (!selectedKeywords.includes(keyword)) {
            setSelectedKeywords([...selectedKeywords, keyword]);
        }
        closeAllDropdowns();
    };


    const removeKeyword = (keyword) => {
        setSelectedKeywords(selectedKeywords.filter(item => item !== keyword));
    };


    const toggleDropdown = (category) => {
        setIsDropdownOpen((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };


    const closeAllDropdowns = () => {
        setIsDropdownOpen({ 물건: false, 색상: false, 장소: false });
    };


    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.modalContent}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>&lt;</button>  {/* 화살표 클릭 시 이전 화면으로 이동 */}
                <span className={styles.title}>상세 검색</span>
            </header>

            <div className={styles.keywords}>
                <p>선택된 키워드</p>
                <div className={styles.selectedKeywords}>
                    {selectedKeywords.map((keyword, index) => (
                        <span key={index} className={styles.keyword}>
                            {keyword} <button className={styles.removeBtn} onClick={() => removeKeyword(keyword)}>X</button>
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.category}>
                <p>종류</p>
                <div className={styles.categoryButtons}>
                    <button onClick={() => toggleDropdown('물건')}>
                        물건 {isDropdownOpen.물건 ? '▲' : '▼'}
                    </button>
                    <button onClick={() => toggleDropdown('색상')}>
                        색상 {isDropdownOpen.색상 ? '▲' : '▼'}
                    </button>
                    <button onClick={() => toggleDropdown('장소')}>
                        장소 {isDropdownOpen.장소 ? '▲' : '▼'}
                    </button>
                </div>

                {/* 물건 드롭다운 */}
                {isDropdownOpen.물건 && (
                    <div className={styles.dropdown}>
                        {options.물건.map((option, index) => (
                            <div key={index} className={styles.dropdownItem} onClick={() => addKeyword(option)}>
                                {option}
                            </div>
                        ))}
                    </div>
                )}

                {/* 색상 드롭다운 */}
                {isDropdownOpen.색상 && (
                    <div className={styles.dropdown}>
                        {options.색상.map((option, index) => (
                            <div key={index} className={styles.dropdownItem} onClick={() => addKeyword(option)}>
                                {option}
                            </div>
                        ))}
                    </div>
                )}

                {/* 장소 드롭다운 */}
                {isDropdownOpen.장소 && (
                    <div className={styles.dropdown}>
                        {options.장소.map((option, index) => (
                            <div key={index} className={styles.dropdownItem} onClick={() => addKeyword(option)}>
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchModal;
