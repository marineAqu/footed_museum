import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Register.module.css';

const Register = () => {
    const [myId, setMyId] = useState(null);
    const [preview, setPreview] = useState(null);

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [keywords, setKeywords] = useState('');
    const [location, setLocation] = useState('');   //여기 추가
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('1');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch("/api/protected", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                });

                if (!response.ok) {
                    setMyId(3); //로그인하지 않은 유저의 경우 익명의 유저로 처리
                    throw new Error('로그인 정보를 가져오는 데 실패했습니다.');
                }

                const result = await response.json();
                setMyId(result.user.user_id);
            } catch (error) {
                console.error('로그인 정보 에러: ', error);
                console.log('로그인 정보: ', myId);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));

        const imgFormData = new FormData();
        imgFormData.append('image', file);

        try {
            const objectResponse = await fetch('/visionTest', {
                method: 'POST',
                body: imgFormData,
            });

            const objectResult = await objectResponse.json();
            setKeywords(objectResult.object);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleRegister = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('image', image);
        formDataToSend.append('title', title);
        formDataToSend.append('keyword', keywords);
        formDataToSend.append('location', location);    //여기 추가
        formDataToSend.append('content', description);
        formDataToSend.append('status', status);
        formDataToSend.append('userid', myId);

        try {
            const response = await fetch("/tempRegister", {
                method: "Post",
                headers: {
                    'Accept': 'application/json',
                },
                body: formDataToSend,
            });


            if (response.status === 200) {
                alert('등록되었습니다!');
                navigate('/Home');
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('등록에 실패했습니다.');
        }
    };

    return (
        <div className={styles.Register}>
            <header className={styles.header}>
                <div className={styles.leftSection}>
                    <button className={styles.backButton} onClick={goBack}>{'<'}</button>
                </div>
                <div className={styles.rightSection}>
                    <button className={styles.TempSaveButton}>임시저장</button>
                    <button className={styles.ChangeButton}>수정</button>
                    <button onClick={handleRegister} className={styles.RegisterButton}>등록</button>
                </div>
            </header>
            <div className={styles.form}>
                <div className={styles.imageUpload}>
                    {!preview && <label htmlFor="image">사진 추가</label>}
                    <input type="file" id="image" name="image"
                           onChange={handleImageChange}
                    />
                    {preview && <img src={preview} alt="미리보기" />}
                </div>
                <div className={styles.inputGroup}>
                    <label>분실물 제목 입력</label>
                    <input type="text" name="title" value={title}
                           onChange={(e) => setTitle(e.target.value)} // 입력 값 변경 시 상태 업데이트
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>인식된 키워드 확인/수정</label>
                    <input type="text" name="keywords" value={keywords}
                           onChange={(e) => setKeywords(e.target.value)} // 입력 값 변경 시 상태 업데이트
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>장소 입력</label>
                    <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>기타 상세 설명</label>
                    <textarea rows="4" name="description" value={description}
                              onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>주웠어요 / 잃어버렸어요</label>
                    <select name="status" value={status}
                            onChange={(e) => setStatus(e.target.value)} // 입력 값 변경 시 상태 업데이트
                    >
                        <option value="1">잃어버렸어요</option>
                        <option value="0">주웠어요</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
export default Register;