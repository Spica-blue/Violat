import React, { useEffect, useRef, useState } from 'react';
import styles from './ScrollBar.module.css';

function ScrollBar({ children }) {
  const scrollContainerRef = useRef(null);
  const scrollContentRef = useRef(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollContent = scrollContentRef.current;

    const updateScrollThumb = () => {
      const scrollHeight = scrollContent.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const scrollTop = scrollContent.scrollTop;

      const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
      const thumbTop = (scrollTop / scrollHeight) * clientHeight;

      setThumbHeight(thumbHeight);
      setThumbTop(thumbTop);
    };

    const handleScroll = (e) => {
      e.preventDefault(); // 기본 스크롤 동작 방지
      const delta = e.deltaY || e.detail || e.wheelDelta;
      scrollContent.scrollTop += delta; // 커스텀 스크롤 적용
      updateScrollThumb();
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.userSelect = 'auto';
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;

      const clientHeight = scrollContainer.clientHeight;
      const scrollHeight = scrollContent.scrollHeight;

      const newThumbTop = e.clientY - scrollContainer.getBoundingClientRect().top - thumbHeight / 2;

      scrollContent.scrollTop = (newThumbTop / clientHeight) * scrollHeight;
      updateScrollThumb();
    };

    scrollContent.addEventListener('scroll', updateScrollThumb);
    scrollContainer.addEventListener('wheel', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    updateScrollThumb(); // 초기 스크롤 상태 업데이트

    return () => {
      scrollContent.removeEventListener('scroll', updateScrollThumb);
      scrollContainer.removeEventListener('wheel', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [thumbHeight]);

  return (
    <div className={styles.scrollContainer} ref={scrollContainerRef}>
      <div className={styles.scrollContent}>
        <div className={styles.scrollInner} ref={scrollContentRef}>
          {children}
        </div>
      </div>
      <div className={styles.verticalScroll}>
        <div
          className={styles.scrollThumb}
          style={{ height: `${thumbHeight}px`, transform: `translateY(${thumbTop}px)` }}
          onMouseDown={(e) => {
            isDraggingRef.current = true;
            document.body.style.userSelect = 'none'; // 드래그 도중 텍스트 선택 방지
            }}
        ></div>
      </div>
    </div>
  );
}

export default ScrollBar;
