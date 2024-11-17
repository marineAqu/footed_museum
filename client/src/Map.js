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

    const handleDoubleClick = (location) => {
        navigate('/search-results', { state: { location } });
    };

    return (
        <div>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>&lt;</button>
                <span className={styles.title}>지도</span>
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
                    useMap="#main_map"
                    alt="학교 지도"
                    className={styles.mapImage}
                    style={{
                        transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                        cursor: isDragging ? 'grabbing' : 'grab',
                    }}
                />
                <map name="main_map">
                    <area alt="미래" title="미래" onDoubleClick={() => handleDoubleClick("미래")} coords="301,200,420,331" shape="rect"/>
                    <area alt="인문대" title="인문대" onDoubleClick={() => handleDoubleClick("인문대")} coords="202,479,97,315" shape="rect"/>
                    <area alt="종강" title="종강" onDoubleClick={() => handleDoubleClick("종강")} coords="546,253,678,322" shape="rect"/>
                    <area alt="IT" title="IT" onDoubleClick={() => handleDoubleClick("IT")} coords="602,494,717,616" shape="rect"/>
                    <area alt="법정대" title="법정대" onDoubleClick={() => handleDoubleClick("법정대")} coords="840,613,898,659" shape="rect"/>
                    <area alt="자연과학대" title="자연과학대" onDoubleClick={() => handleDoubleClick("자연과학대")} coords="762,555,840,609" shape="rect"/>
                    <area alt="글경" title="글경" onDoubleClick={() => handleDoubleClick("글경")} coords="730,788,805,879" shape="rect"/>
                    <area alt="공대" title="공대" onDoubleClick={() => handleDoubleClick("공대")} coords="418,270,498,313" shape="rect"/>
                    <area alt="학생회관" title="학생회관" onDoubleClick={() => handleDoubleClick("학생회관")} coords="743,393,644,322" shape="rect"/>
                    <area alt="도서관" title="도서관" onDoubleClick={() => handleDoubleClick("도서관")} coords="734,397,875,516" shape="rect"/>
                    <area alt="미대" title="미대" onDoubleClick={() => handleDoubleClick("미대")} coords="715,269,828,321" shape="rect"/>
                    <area alt="음대" title="음대" onDoubleClick={() => handleDoubleClick("음대")} coords="684,709,805,778" shape="rect"/>
                    <area alt="운동장" title="운동장" onDoubleClick={() => handleDoubleClick("운동장")} coords="389,328,571,436" shape="rect"/>
                </map>
            </div>
        </div>
    );
};

export default Map;
