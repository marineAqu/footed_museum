import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Register.module.css';

const Register = () => {
    const [myId, setMyId] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        //const apitest = fetch("/visionTest");

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

    const [formData, setFormData] = useState({
        image: null,
        title: '',
        keywords: '',
        description: '',
        status: '1',
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files.length > 0) {
            // 이미지가 선택된 경우 formData에 파일을 업데이트
            const file = files[0];
            setFormData({
                ...formData,
                image: file
            });
            setPreview(URL.createObjectURL(file));
        } else {
            // 텍스트 입력 필드 등 다른 입력에 대해서도 처리
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };



    const goBack = () => {
        navigate(-1);
    };

    const handleRegister = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('image', formData.image);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('keyword', formData.keywords);
        formDataToSend.append('content', formData.description);
        formDataToSend.append('status', formData.status);
        formDataToSend.append('userid', myId);


        try {
            const apitest = await fetch('/visionTest', {
                method: 'POST',
                body: formDataToSend,
            });


            /*
            const response = await fetch("/tempRegister", {
                method: "Post",
                headers: {
                    'Accept': 'application/json',
                },
                body: formDataToSend,
            });


            if (response.status === 200) {
                alert('등록되었습니다!');
                //navigate('/'); // TODO: 전체 게시글로 direct
            }
*/
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
                    <input type="file" id="image" name="image" onChange={handleInputChange} />
                    {preview && <img src={preview} alt="미리보기" />}
                </div>
                <div className={styles.inputGroup}>
                    <label>분실물 제목 입력</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                </div>
                <div className={styles.inputGroup}>
                    <label>인식된 키워드 확인/수정</label>
                    <input type="text" name="keywords" value={formData.keywords} onChange={handleInputChange} />
                </div>
                <div className={styles.inputGroup}>
                    <label>기타 상세 설명</label>
                    <textarea rows="4" name="description" value={formData.description} onChange={handleInputChange} />
                </div>
                <div className={styles.inputGroup}>
                    <label>주웠어요 / 잃어버렸어요</label>
                    <select name="status" value={formData.status} onChange={handleInputChange}>
                        <option value="1">잃어버렸어요</option>
                        <option value="0">주웠어요</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
export default Register;