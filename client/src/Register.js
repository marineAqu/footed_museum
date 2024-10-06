import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Register.module.css';

const Register = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
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
                    <button className={styles.RegisterButton}>등록</button>
                </div>

            </header>

            <div className={styles.form}>
                <div className={styles.imageUpload}>
                    <label htmlFor="image">사진 추가</label>
                    <input type="file" id="image" name="image" />
                </div>
                <div className={styles.inputGroup}>
                    <label>분실물 제목 입력</label>
                    <input type="text" />
                </div>
                <div className={styles.inputGroup}>
                    <label>인식된 키워드 확인/수정</label>
                    <input type="text" />
                </div>
                <div className={styles.inputGroup}>
                    <label>기타 상세 설명</label>
                    <textarea rows="4" />
                </div>

                <div className={styles.inputGroup}>
                    <label>주웠어요 / 잃어버렸어요</label>
                    <select>
                        <option value="잃어버렸어요">잃어버렸어요</option>
                        <option value="주웠어요">주웠어요</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Register;