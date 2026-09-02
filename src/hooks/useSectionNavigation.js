import { useEffect, useRef, useState, useCallback } from 'react';

export function useSectionNavigation(enabled = true) {
  const [currentSection, setCurrentSection] = useState('hero');
  const isAnimatingRef = useRef(false);
  const lastWheelTimeRef = useRef(0);

  const getSectionElements = useCallback(() => {
    const snapElements = Array.from(document.querySelectorAll('.snap-section'));
    if (snapElements.length > 0) {
      return snapElements;
    }
    const defaultIds = [
      'hero', 
      'sobre', 
      'atuacoes', 
      'skills', 
      'projetos', 
      'trajetoria', 
      'carta', 
      'contato', 
      'admin-email', 
      'admin-prompt'
    ];
    return defaultIds.map((id) => document.getElementById(id)).filter(Boolean);
  }, []);

  const getCurrentIndex = useCallback(() => {
    const elements = getSectionElements();
    if (!elements.length) return 0;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollBottom = scrollY + windowHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Extremos de rolagem
    if (scrollY <= 40) return 0;
    if (scrollBottom >= docHeight - 40) return elements.length - 1;

    // Foco no centro da viewport
    const viewportFocus = scrollY + windowHeight * 0.45;

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (viewportFocus >= top && viewportFocus < bottom) {
        return i;
      }
    }

    // Fallback: seção com topo mais próximo
    let closestIdx = 0;
    let minDiff = Infinity;
    elements.forEach((el, idx) => {
      const diff = Math.abs(el.offsetTop - scrollY);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    return closestIdx;
  }, [getSectionElements]);

  const scrollToSectionIndex = useCallback((index) => {
    const elements = getSectionElements();
    const targetIndex = Math.max(0, Math.min(elements.length - 1, index));
    const targetEl = elements[targetIndex];

    if (targetEl) {
      isAnimatingRef.current = true;
      setCurrentSection(targetEl.id);

      const targetTop = targetEl.offsetTop;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
      });

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 500);
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
      const index = getCurrentIndex();
      const elements = getSectionElements();
      if (elements[index]) {
        setCurrentSection(elements[index].id);
      }
    };

    const isModalOpen = () => {
      return (
        document.body.style.overflow === 'hidden' ||
        document.documentElement.style.overflow === 'hidden' ||
        Boolean(document.querySelector('[role="dialog"], [aria-modal="true"], .fixed.inset-0.z-\\[100\\], .fixed.inset-0.z-\\[110\\], .fixed.inset-0.z-\\[120\\]'))
      );
    };

    // Navegação por teclado inteligente (1-to-1 snap)
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (isModalOpen()) return;

      const currentIndex = getCurrentIndex();
      const elements = getSectionElements();
      if (!elements.length) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < elements.length - 1) {
          e.preventDefault();
          scrollToSectionIndex(currentIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToSectionIndex(currentIndex - 1);
        }
      }
    };

    // Navegação por Mouse Wheel com transições 1-to-1 puras e debounce
    const handleWheel = (e) => {
      // Se qualquer modal estiver aberto, não navega seções em hipótese alguma
      if (isModalOpen()) return;

      if (Math.abs(e.deltaY) < 18) return;

      const now = Date.now();
      if (isAnimatingRef.current || now - lastWheelTimeRef.current < 450) {
        e.preventDefault();
        return;
      }

      // Checa se o usuário está rolando dentro de um elemento rolável interno (modal, textarea, etc.)
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

      const elements = getSectionElements();
      if (!elements.length) return;

      const currentIndex = getCurrentIndex();

      if (e.deltaY > 0) {
        // ROLANDO PARA BAIXO -> Próxima seção
        if (currentIndex < elements.length - 1) {
          e.preventDefault();
          lastWheelTimeRef.current = now;
          scrollToSectionIndex(currentIndex + 1);
        }
      } else {
        // ROLANDO PARA CIMA -> Seção anterior
        if (currentIndex > 0) {
          e.preventDefault();
          lastWheelTimeRef.current = now;
          scrollToSectionIndex(currentIndex - 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [enabled, getCurrentIndex, getSectionElements, scrollToSectionIndex]);

  return { currentSection, scrollToSectionIndex, goToNext, goToPrev };
}