import { useEffect, useRef, useState, useCallback } from 'react';

const SECTIONS = ['hero', 'sobre', 'atuacoes', 'skills', 'projetos', 'trajetoria', 'carta', 'contato'];

export function useSectionNavigation(enabled = true) {
  const [currentSection, setCurrentSection] = useState('hero');
  const isAnimatingRef = useRef(false);
  const touchStartY = useRef(0);

  const getSectionElements = useCallback(() => {
    return SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
  }, []);

  const getCurrentIndex = useCallback(() => {
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    const elements = getSectionElements();

    for (let i = elements.length - 1; i >= 0; i--) {
      if (scrollPos >= elements[i].offsetTop) {
        return i;
      }
    }
    return 0;
  }, [getSectionElements]);

  const scrollToSectionIndex = useCallback((index) => {
    const elements = getSectionElements();
    const targetIndex = Math.max(0, Math.min(elements.length - 1, index));
    const targetEl = elements[targetIndex];

    if (targetEl) {
      isAnimatingRef.current = true;
      setCurrentSection(targetEl.id);

      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 750);
    }
  }, [getSectionElements]);

  const goToNext = useCallback(() => {
    const currentIndex = getCurrentIndex();
    scrollToSectionIndex(currentIndex + 1);
  }, [getCurrentIndex, scrollToSectionIndex]);

  const goToPrev = useCallback(() => {
    const currentIndex = getCurrentIndex();
    scrollToSectionIndex(currentIndex - 1);
  }, [getCurrentIndex, scrollToSectionIndex]);

  useEffect(() => {
    if (!enabled) return;

    // Acompanha a rolagem passivamente para atualizar o estado do menu
    const handleScroll = () => {
      if (isAnimatingRef.current) return;
      const index = getCurrentIndex();
      const elements = getSectionElements();
      if (elements[index]) {
        setCurrentSection(elements[index].id);
      }
    };

    // Navegação por teclado
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      // DESATIVA SNAP NA SEÇÃO DE PROJETOS
      const currentIndex = getCurrentIndex();
      const elements = getSectionElements();
      if (elements[currentIndex]?.id === 'projetos') return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      }
    };

    // Navegação por Mouse Wheel (scroll do mouse)
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 30) return;
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      // DESATIVA SNAP NA SEÇÃO DE PROJETOS PARA PERMITIR ROLAGEM NORMAL VERTICAL
      const currentIndex = getCurrentIndex();
      const elements = getSectionElements();
      if (elements[currentIndex]?.id === 'projetos') return;

      // Checa se o usuário está rolando dentro de um elemento rolável interno
      let target = e.target;
      while (target && target !== document.body && target !== document.documentElement) {
        const overflowY = window.getComputedStyle(target).overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && target.scrollHeight > target.clientHeight) {
          const isAtTop = target.scrollTop <= 0 && e.deltaY < 0;
          const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1 && e.deltaY > 0;
          if (!isAtTop && !isAtBottom) {
            return; // Permite o scroll interno nativo
          }
        }
        target = target.parentElement;
      }

      e.preventDefault();
      if (e.deltaY > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    };

    // Navegação por toque (celular)
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isAnimatingRef.current) return;

      // DESATIVA SNAP NA SEÇÃO DE PROJETOS
      const currentIndex = getCurrentIndex();
      const elements = getSectionElements();
      if (elements[currentIndex]?.id === 'projetos') return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      if (Math.abs(diff) > 60) {
        if (diff > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, getCurrentIndex, getSectionElements, goToNext, goToPrev]);

  return { currentSection, scrollToSectionIndex, goToNext, goToPrev };
}