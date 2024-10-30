import React, { useState, useEffect, useRef } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styles from './css/ChatScreen.module.css';

const ChatScreen = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef(null);
    const [ws, setWs] = useState(null);
    const {chatRoomId} = useParams();
    const [myId, setMyId] = useState(null);

    //TODO
    // 채팅룸 하드코딩된 거 고쳐야함
    // 음.???;; 서버 껏다켯는데 왜 여전히 로그인정보가남아잇지

    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    //메시지 보낼 때 이벤트
    const handleSendMessage = () => {
        if (inputMessage.trim()) {

            if (ws && ws.readyState === WebSocket.OPEN) {
                const message = { chatRoomId: chatRoomId, senderId: myId, senderName: '김도연', message: inputMessage }; // Replace senderId with actual user ID
                ws.send(JSON.stringify(message));
                setInputMessage('');
            }
            else {
                console.error('WebSocket is not open');
            }
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
        const fetchData = async () => {
            try{
                const token = localStorage.getItem("token");

                const response = await fetch("/api/protected", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                });

                if(!response.ok){
                    setMyId(3); //로그인하지 않은 유저의 경우 익명의 유저로 처리
                    throw new Error('로그인 정보를 가져오는 데 실패했습니다.');
                }

                const result = await response.json();
                setMyId(result.user.user_id);

                console.log('로그인 정보: ', result.user.user_id);
            }catch (error){
                setMyId(3);
                console.error('로그인 정보 에러: ', error);
                console.log('로그인 정보: ', myId);
            }
        };

        fetchData();



        const socket = new WebSocket('ws://localhost:8008');

        setWs(socket);

        socket.onopen = () => {
            console.log('front: WebSocket is connected');
        };

        socket.onmessage = (event) => {
            console.log('front: Received:', JSON.parse(event.data));
            const message = JSON.parse(event.data);
            console.log('정돈한 데이터: ', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = (event) => {
            console.log('WebSocket is closed now.', event);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            socket.close();
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
                    <div key={index} className={msg.senderId === myId ? styles.myMessage : styles.friendMessage}>
                        {msg.isImage ? (
                            <img src={msg.text} alt="전송된 이미지" className={styles.imageMessage} />
                        ) : (
                            msg.message
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
