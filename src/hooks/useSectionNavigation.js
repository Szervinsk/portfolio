import { useEffect, useRef, useState, useCallback } from 'react';

const SECTION_IDS = [
  'hero',
  'sobre',
  'trajetoria',
  'projetos',
  'skills',
  'carta',
  'contato',
  'admin-email',
  'admin-prompt'
];

/**
 * Hook para navegação fluida por seções (teclado + wheel snapping inteligente)
 * e orquestração de animações de entrada (drop-in motion) ao entrar em cada seção.
 */
export function useSectionNavigation(enabled = true) {
  const [currentSection, setCurrentSection] = useState('hero');
  const isAnimatingRef = useRef(false);
  const lastWheelTimeRef = useRef(0);
  const animationTimerRef = useRef(null);

  // Retorna os elementos das seções na ordem correta do documento
  const getSectionElements = useCallback(() => {
    // 1. Tenta pelos IDs canônicos definidos
    const elementsById = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (elementsById.length > 0) {
      return elementsById.filter((el) => el.offsetHeight > 0);
    }

    // 2. Fallback: elementos com classe .snap-section
    const snapElements = Array.from(document.querySelectorAll('.snap-section'));
    return snapElements.filter((el) => el.offsetHeight > 0);
  }, []);

  // Determina o índice da seção visível atual (sincronizado com o alinhamento centralizado)
  const getCurrentIndex = useCallback(() => {
    const elements = getSectionElements();
    if (!elements.length) return 0;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollBottom = scrollY + windowHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Extremos de rolagem (topo e rodapé)
    if (scrollY <= 80) return 0;
    if (scrollBottom >= docHeight - 80) return elements.length - 1;

    // Foco no centro da viewport
    const viewportCenter = scrollY + windowHeight / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const elCenter = el.offsetTop + el.offsetHeight / 2;
      const distance = Math.abs(elCenter - viewportCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    return closestIndex;
  }, [getSectionElements]);

  // Transição suave para um índice específico de seção (centralizado na viewport)
  const scrollToSectionIndex = useCallback((index) => {
    const elements = getSectionElements();
    if (!elements.length) return;

    const targetIndex = Math.max(0, Math.min(elements.length - 1, index));
    const targetEl = elements[targetIndex];

    if (targetEl) {
      isAnimatingRef.current = true;
      setCurrentSection(targetEl.id);

      // Garante a classe de entrada para disparar as animações drop-in imediatamente
      targetEl.classList.add('section-entered');

      // Se for a primeira seção (Hero), rola para o topo absoluto
      if (targetIndex === 0 || targetEl.id === 'hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // Centraliza a seção verticalmente na viewport
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }

      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
      animationTimerRef.current = setTimeout(() => {
        isAnimatingRef.current = false;
      }, 700);
    }
  }, [getSectionElements]);

  // Navega para uma seção por ID ou índice
  const scrollToSection = useCallback((target) => {
    const elements = getSectionElements();
    if (!elements.length) return;

    let targetIndex = -1;
    if (typeof target === 'number') {
      targetIndex = target;
    } else if (typeof target === 'string') {
      targetIndex = elements.findIndex((el) => el.id === target);
    }

    if (targetIndex !== -1) {
      scrollToSectionIndex(targetIndex);
    }
  }, [getSectionElements, scrollToSectionIndex]);

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

    // Checa se algum modal ou sobreposição bloqueia a navegação de página
    const isModalOpen = () => {
      return (
        document.body.style.overflow === 'hidden' ||
        document.documentElement.style.overflow === 'hidden' ||
        Boolean(document.querySelector('[role="dialog"], [aria-modal="true"], .fixed.inset-0.z-\\[100\\], .fixed.inset-0.z-\\[110\\], .fixed.inset-0.z-\\[120\\]'))
      );
    };

    // 1. IntersectionObserver para adicionar/remover .section-entered e acionar os motions
    const elements = getSectionElements();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-entered');
          } else {
            // Remove quando sair da tela para que re-anime ao entrar novamente
            entry.target.classList.remove('section-entered');
          }
        });
      },
      {
        threshold: [0.15, 0.45],
        rootMargin: '0px 0px -5% 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Ativa a primeira seção imediatamente se estiver no topo
    if (elements[0] && window.scrollY <= 100) {
      elements[0].classList.add('section-entered');
    }

    // 2. Acompanhamento passivo de rolagem para atualizar a Navbar em tempo real
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const index = getCurrentIndex();
          const currentEls = getSectionElements();
          if (currentEls[index] && currentEls[index].id) {
            setCurrentSection(currentEls[index].id);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // 3. Navegação por Teclado (Setas para cima/baixo, PageUp/PageDown, Espaço)
    const handleKeyDown = (e) => {
      // Ignora se estiver digitando em campos de texto
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (document.activeElement?.isContentEditable) return;
      if (isModalOpen()) return;

      const currentEls = getSectionElements();
      if (!currentEls.length) return;
      const currentIndex = getCurrentIndex();

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < currentEls.length - 1) {
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

    // 4. Navegação por Mouse Wheel (Scroll com Snap Inteligente)
    const handleWheel = (e) => {
      if (isModalOpen()) return;
      if (Math.abs(e.deltaY) < 22) return;

      const now = Date.now();
      // Debounce para evitar múltiplos disparos por inércia de trackpad
      if (isAnimatingRef.current || now - lastWheelTimeRef.current < 600) {
        e.preventDefault();
        return;
      }

      // Permite rolagem normal se estiver dentro de um container com scroll interno
      let target = e.target;
      while (target && target !== document.body && target !== document.documentElement) {
        const style = window.getComputedStyle(target);
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && target.scrollHeight > target.clientHeight) {
          const isAtTop = target.scrollTop <= 0 && e.deltaY < 0;
          const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 2 && e.deltaY > 0;
          if (!isAtTop && !isAtBottom) {
            return; // Permite o scroll interno nativo
          }
        }
        target = target.parentElement;
      }

      const currentEls = getSectionElements();
      if (!currentEls.length) return;
      const currentIndex = getCurrentIndex();
      const currentEl = currentEls[currentIndex];

      // Se a seção atual for mais alta que a janela (ex: projetos com muitos itens em tela pequena),
      // permite rolar normalmente dentro dela antes de dar o snap para a próxima seção
      if (currentEl) {
        const isTallerThanViewport = currentEl.offsetHeight > window.innerHeight + 100;
        if (isTallerThanViewport) {
          const elTop = currentEl.offsetTop;
          const elBottom = elTop + currentEl.offsetHeight;
          const scrollY = window.scrollY;
          const viewportBottom = scrollY + window.innerHeight;

          if (e.deltaY > 0 && viewportBottom < elBottom - 80) {
            return; // Rola naturalmente para ver o restante do conteúdo
          }
          if (e.deltaY < 0 && scrollY > elTop + 80) {
            return; // Rola naturalmente para cima dentro da seção
          }
        }
      }

      // Snap para a próxima seção ou anterior
      if (e.deltaY > 0) {
        if (currentIndex < currentEls.length - 1) {
          e.preventDefault();
          lastWheelTimeRef.current = now;
          scrollToSectionIndex(currentIndex + 1);
        }
      } else {
        if (currentIndex > 0) {
          e.preventDefault();
          lastWheelTimeRef.current = now;
          scrollToSectionIndex(currentIndex - 1);
        }
      }
    };

    // 5. Suporte a clique em links internos (#seção) para centralizar
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#/')) return;
      const sectionId = href.slice(1);
      const currentEls = getSectionElements();
      const targetIdx = currentEls.findIndex((el) => el.id === sectionId);
      if (targetIdx !== -1) {
        e.preventDefault();
        scrollToSectionIndex(targetIdx);
        window.history.pushState(null, '', href);
      }
    };

    // 6. Garante que qualquer chamada a scrollIntoView para seções utilize block: 'center'
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function(options) {
      if (this && (this.classList?.contains('snap-section') || SECTION_IDS.includes(this.id))) {
        if (typeof options === 'object' && options !== null && !options.block) {
          return originalScrollIntoView.call(this, { ...options, block: 'center' });
        }
      }
      return originalScrollIntoView.apply(this, arguments);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('click', handleAnchorClick);

    // Checagem inicial
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('click', handleAnchorClick);
      Element.prototype.scrollIntoView = originalScrollIntoView;
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, [enabled, getCurrentIndex, getSectionElements, scrollToSectionIndex]);

  return { currentSection, scrollToSection, scrollToSectionIndex, goToNext, goToPrev };
}