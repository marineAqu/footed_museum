import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/SearchModal.module.css';

const SearchModal = ({ onClose }) => {
    const navigate = useNavigate();

    // State variables
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState({ 물건: false, 색상: false, 장소: false });
    const [isCustomInputVisible, setIsCustomInputVisible] = useState(false); // 입력창 표시 상태
    const [inputValue, setInputValue] = useState(''); // 사용자 입력 값

    const [options] = useState({
        물건: ['지갑', '이어폰', '카드', '기타', '입력'],
        색상: ['빨강', '파랑', '검정', '흰색', '노랑', '초록', '보라'],
        장소: ['자연과학대', '법정대', 'IT', '종강', '미래', '인문대', '글경', '공대', '학생회관', '도서관', '미대', '음대', '운동장']
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
        setIsDropdownOpen({
            물건: category === '물건' ? !isDropdownOpen.물건 : false,
            색상: category === '색상' ? !isDropdownOpen.색상 : false,
            장소: category === '장소' ? !isDropdownOpen.장소 : false,
        });
    };

    const closeAllDropdowns = () => {
        setIsDropdownOpen({ 물건: false, 색상: false, 장소: false });
        setIsCustomInputVisible(false); // 입력창도 닫기
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleSearch = () => {
        if (selectedKeywords.length > 0) {
            const category_id = selectedKeywords.filter(
                keyword => options.물건.includes(keyword) || options.색상.includes(keyword)
            );
            const location = selectedKeywords.find(keyword => options.장소.includes(keyword));
            const temp_keyword = selectedKeywords.find(keyword => !options.물건.includes(keyword) && !options.색상.includes(keyword) && !options.장소.includes(keyword));

            navigate('/search-results', {
                state: { category_id, location, temp_keyword }
            });
        } else {
            alert('키워드를 선택해주세요.');
        }
    };

    const toggleCustomInput = () => {
        setIsCustomInputVisible(!isCustomInputVisible);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddCustomKeyword = () => {
        if (inputValue.trim() && !selectedKeywords.includes(inputValue)) {
            setSelectedKeywords([...selectedKeywords, inputValue.trim()]);
            setInputValue('');
            setIsCustomInputVisible(false);
        }
    };

    return (
        <div className={styles.modalContent}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>&lt;</button>
                <span className={styles.title}>상세 검색</span>
                <button className={styles.searchButton} onClick={handleSearch}>검색</button>
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
                            <div
                                key={index}
                                className={styles.dropdownItem}
                                onClick={() => option === '입력' ? toggleCustomInput() : addKeyword(option)}
                            >
                                {option}
                            </div>
                        ))}
                        {isCustomInputVisible && (
                            <div className={styles.customInputContainer}>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder="키워드를 입력하세요"
                                    className={styles.customInput}
                                />
                                <button onClick={handleAddCustomKeyword} className={styles.addButton}>등록</button>
                            </div>
                        )}
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



