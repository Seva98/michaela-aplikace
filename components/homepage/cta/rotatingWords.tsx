'use client';
import { useState, useEffect, useRef } from 'react';

const RotatingWords = () => {
  const words = ['Plánování tréninků', 'Správu klientů', 'Vytváření dotazníků', 'AI analýzů tréninků'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordWidth, setWordWidth] = useState(0);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000); // Change word every 2 seconds
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    // Update the container width based on the current word
    if (wordRef.current) {
      setWordWidth(wordRef.current.offsetWidth);
    }
  }, [currentWordIndex]);

  return (
    <div className="flex items-center justify-center  text-slate-900 font-bold">
      <span className="me-2 text-3xl">Nástroj pro</span>
      <div
        className="relative overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          width: `${wordWidth}px`, // Dynamically adjusts width
          height: '3rem', // Matches the height of one word
        }}
      >
        <div
          className="absolute top-0 left-0 transition-transform duration-500 ease-in-out text-4xl"
          style={{
            transform: `translateY(-${currentWordIndex * 3}rem)`, // Dynamically position the visible word
          }}
        >
          {words.map((word, index) => (
            <div
              key={index}
              ref={index === currentWordIndex ? wordRef : null}
              className="h-12 text-teal-600 flex items-center justify-start whitespace-nowrap font-extrabold"
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RotatingWords;
