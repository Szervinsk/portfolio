import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Preloader({ onZoomStart, onComplete }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  
  const onZoomStartRef = useRef(onZoomStart);
  onZoomStartRef.current = onZoomStart;

  const { t } = useLanguage();
  const messages = t?.preloader || ["Matheus", "Ribeiro", "Szervinsk", "Bem vindo ao meu portfolio"];

  useEffect(() => {
    if (isZooming) return;

    const currentWord = messages[msgIndex];
    let timeout;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 50);
      } else {
        if (msgIndex < messages.length - 1) {
          timeout = setTimeout(() => setIsDeleting(true), 450);
        } else {
          // Última palavra pronta: dispara o zoom
          timeout = setTimeout(() => {
            setIsZooming(true);
            onZoomStartRef.current?.();

            // Espera a animação de escala terminar para desmontar o preloader
            setTimeout(() => {
              onCompleteRef.current?.();
            }, 300);
          }, 300);
        }
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, 25);
      } else {
        setIsDeleting(false);
        setMsgIndex((prev) => prev + 1);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, msgIndex, messages, isZooming]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center select-none overflow-hidden transition-colors duration-700 pointer-events-none ${
        isZooming ? 'bg-transparent' : 'bg-zinc-950'
      }`}
      style={{ perspective: '1000px' }}
    >
      <div className="relative px-6 text-center flex items-center justify-center">
        <h1
          className={`text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-sans text-white inline-flex items-center justify-center whitespace-nowrap will-change-transform transition-all ${
            isZooming
              ? 'scale-[80] opacity-0 duration-[250ms] ease-[cubic-bezier(0.7,0,0.84,0)]'
              : 'scale-100 opacity-100 duration-0'
          }`}
        >
          <span>{displayedText}</span>
          
          <span
            className={`inline-block w-2 sm:w-3 h-10 sm:h-16 ml-2 bg-[#fef08a] transition-opacity duration-150 ${
              isZooming ? 'opacity-0' : 'animate-pulse'
            }`}
          />
        </h1>
      </div>
    </div>
  );
}