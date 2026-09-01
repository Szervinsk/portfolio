import { useState, useEffect, useRef } from 'react';

/**
 * Hook for smooth lerped mouse tracking across the screen
 */
export function useMouseParallax(smoothFactor = 0.08) {
  const [coords, setCoords] = useState({ x: 0, y: 0, rawX: 0, rawY: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      targetRef.current = { x: nx, y: ny, rawX: e.clientX, rawY: e.clientY };
    };

    const updateSmooth = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * smoothFactor;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * smoothFactor;

      setCoords({
        x: currentRef.current.x,
        y: currentRef.current.y,
        rawX: targetRef.current.rawX || 0,
        rawY: targetRef.current.rawY || 0,
      });

      animationFrameRef.current = requestAnimationFrame(updateSmooth);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameRef.current = requestAnimationFrame(updateSmooth);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [smoothFactor]);

  return coords;
}

/**
 * Hook for scroll tracking and scroll-based parallax
 */
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      setScrollProgress(totalHeight > 0 ? currentScroll / totalHeight : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, scrollY };
}

/**
 * Hook for 3D card tilt on hover
 */
export function useTiltCard(maxTilt = 8) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({
      rotateX,
      rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  return { cardRef, tilt, handleMouseMove, handleMouseLeave };
}
