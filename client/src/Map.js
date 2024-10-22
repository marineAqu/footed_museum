import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Map.module.css';

const Map = () => {
    const navigate = useNavigate();
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });


    const handleWheel = (event) => {
        event.preventDefault();
        const zoomSpeed = 0.1;
        if (event.deltaY < 0) {
            setScale(prevScale => Math.min(prevScale + zoomSpeed, 3));
        } else {
            setScale(prevScale => Math.max(prevScale - zoomSpeed, 1));
        }
    };


    const handleMouseDown = (event) => {
        setIsDragging(true);
        setStartDrag({ x: event.clientX - position.x, y: event.clientY - position.y });
    };


    const handleMouseMove = (event) => {
        if (!isDragging) return;
        setPosition({
            x: event.clientX - startDrag.x,
            y: event.clientY - startDrag.y,
        });
    };


    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const goBack = () => {
        navigate(-1);
    };

    return (

        <div>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>&lt; </button>
                {/* 뒤로가기 버튼 */}
                <span className={styles.title}>지도 화면</span> {/* 제목 */}
            </header>

            <div
                className={styles.mapContainer}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <img
                    src="/school_map.jpg"
                    alt="학교 지도"
                    className={styles.mapImage}
                    style={{
                        transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                        cursor: isDragging ? 'grabbing' : 'grab',
                    }}
                />

            </div>
        </div>
    );
};

export default Map;
