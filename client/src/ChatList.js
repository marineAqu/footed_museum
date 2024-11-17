import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/ChatList.module.css';

const ChatList = () => {
    const navigate = useNavigate();
    const [myId, setMyId] = useState(null);
    const [mychatRooms, setMyChatRooms] = useState([]);

    useEffect(() => {
        // 로그인 여부 확인
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
                    await setMyId(3); //로그인하지 않은 유저의 경우 익명의 유저로 처리
                    throw new Error('로그인 정보를 가져오는 데 실패했습니다.');
                }

                const result = await response.json();
                await setMyId(result.user.user_id);

                console.log('로그인 정보: ', result.user.user_id);
            }catch (error){
                await setMyId(3);
                console.error('로그인 정보 에러: ', error);
                console.log('로그인 정보: ', myId);
            }
        };

        fetchData().then(async r => {
            try {
                const findChatrooms = await fetch(`/chat/lists?userid=${myId}`);
                const findchatRooms = await findChatrooms.json();
                setMyChatRooms(findchatRooms.chatlist);


            } catch (error) {
                console.error('채팅방 리스트 에러: ', error);
            }
        });


            console.log('채팅방 리스트: ', mychatRooms);

        }, [myId]);

    const chatRooms = [
        {
            id: 1,
            image: '이미지1.png',
            name: '상대방 닉네임1',
            lastMessage: '채팅 내용을 입력하세요.',
            time: '오전 12:00',
            unreadCount: 1,
        },
        {
            id: 2,
            image: '이미지2.png',
            name: '상대방 닉네임2',
            lastMessage: '채팅 내용을 입력하세요.',
            time: '오전 12:00',
            unreadCount: 1,
        },
        // 다른 채팅방들 추가
    ];

    const handleDoubleClick = (chatRoom) => {
        navigate(`/chat/${chatRoom.room_id}`, { state: { chatRoom } }); // 선택한 채팅방의 정보와 함께 이동
    };

    const goToSearch = () => {
        navigate('/search');  // 검색 버튼 클릭 시 /search 경로로 이동
    };

    const goToRegister = () => {
        navigate('/Register');  // 글쓰기 버튼 클릭 시 /Register 경로로 이동
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.chatList}>
            {/* 상단바 추가 */}
            <header className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>&lt; </button>
                <span className={styles.title}>채팅방 목록</span> {/* 분실물 제목 */}
            </header>

            {mychatRooms.map((room, index) => (
                <div
                    key={index}
                    className={styles.chatRoom}
                    onDoubleClick={() => handleDoubleClick(room)}
                >
                    {/*<img src={room.image} alt="프로필" className={styles.profileImage}/>*/}
                    <div className={styles.chatInfo}>
                        <h3>{room.post_id}</h3>
                        <p>{room.lastMessage}</p>
                    </div>
                    <div className={styles.chatMeta}>
                        <span className={styles.time}>{room.room_created_at}</span>
                        {room.unreadCount > 0 && (
                            <div className={styles.unreadBadge}>
                                {room.unreadCount}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
