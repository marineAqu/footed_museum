import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/ChatScreen.module.css';

const ChatScreen = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef(null);

    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            setMessages([...messages, { text: inputMessage, sender: 'me' }]); // 나의 메시지 추가
            setInputMessage(''); // 입력창 초기화

            // 친구의 메시지 추가 예시 (실제 구현에서는 API로 받아올 수 있음)
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: '친구의 응답 메시지', sender: 'friend' } // 친구의 메시지 추가
                ]);
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const toggleOptions = () => {
        setShowOptions((prev) => !prev); // 옵션 표시/숨기기 토글
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setMessages([...messages, { text: reader.result, sender: 'me', isImage: true }]);
            };
            reader.readAsDataURL(file);
        }
        setShowOptions(false); // 옵션 숨기기
    };

    // 바탕 화면 클릭 시 옵션 닫기
    const handleClickOutside = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    // 컴포넌트가 마운트될 때 클릭 이벤트 리스너 추가
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>&lt; </button>
                <span className={styles.title}>채팅</span>
            </header>
            <div className={styles.chatContainer}>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'me' ? styles.myMessage : styles.friendMessage}>
                        {msg.isImage ? (
                            <img src={msg.text} alt="전송된 이미지" className={styles.imageMessage} />
                        ) : (
                            msg.text
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.inputContainer} ref={optionsRef}>
                <button className={styles.plusButton} onClick={toggleOptions}>+</button> {/* + 버튼 */}
                {showOptions && (
                    <div className={styles.options}>
                        <label className={styles.optionItem}>
                            사진
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className={styles.fileInput} />
                        </label>
                        <button className={styles.optionItem} onClick={() => alert('카메라 기능은 아직 구현되지 않았습니다.')}>카메라</button>
                    </div>
                )}
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)} // 입력 값 변경 시 상태 업데이트
                    onKeyPress={handleKeyPress} // 키 입력 이벤트 처리
                    placeholder="메시지를 입력하세요..."
                    className={styles.input}
                />
                <button onClick={handleSendMessage} className={styles.sendButton}>전송</button>
            </div>
        </div>
    );
};

export default ChatScreen;
