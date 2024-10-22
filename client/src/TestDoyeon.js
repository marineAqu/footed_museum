import React, {useEffect, useState} from 'react';

const TestDoyeon = () => {
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const fetchData = async () => {
                try {
                    const response = await fetch('/tempmakeQr');
                    const data = await response.json();
                    setImgSrc(data.imgData);
                } catch (error) {
                    console.error('오류:', error);
                }
            /*try {
                const response = await fetch('/tempmakeQr');
                console.log(response.img);
            }
            catch (error) {
                console.error('오류:', error);
            }

             */

            /*try {

                const response = await fetch('/api/item/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        postId: 3,
                        keywordId: [1],
                    }),
                });
                const result = await response.json();
                console.log(result);

            } catch (error) {
                console.error('오류:', error);
            }
             */
        };

        fetchData();
    },[]);

    return (
        <div>
            <h1>테스트 페이지</h1>
            <p>이 페이지는 테스트 페이지입니다.</p>
            {imgSrc && <img src={imgSrc} alt="QR Code" />}
        </div>
    );
};

export default TestDoyeon;