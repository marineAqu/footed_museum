import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Register.module.css';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        //image: null,
        title: '',
        keywords: '',
        description: '',
        status: '잃어버렸어요',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    const goBack = () => {
        navigate(-1);
    };

    const handleRegister = async () => {
        const formDataToSend = new FormData();
        //formDataToSend.append('image', formData.image);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('keyword', formData.keywords);
        formDataToSend.append('content', formData.description);
        //formDataToSend.append('status', formData.status);

        try {
            /*const response = await fetch("/api/register", {
                method: "Post",
                headers: {
                    /!*"Content-Type": "application/json",*!/
                    'Content-Type': 'multipart/form-data'
                },
                body: formDataToSend,
            });

            if (response.status === 200) {
                alert('등록되었습니다!');
                //navigate('/'); // TODO: 전체 게시글로 direct
            }*/

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
                    <label htmlFor="image">사진 추가</label>
                    <input type="file" id="image" name="image" />
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
                        <option value="잃어버렸어요">잃어버렸어요</option>
                        <option value="주웠어요">주웠어요</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
export default Register;