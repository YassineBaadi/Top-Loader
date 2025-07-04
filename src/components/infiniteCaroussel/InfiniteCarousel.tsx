'use client'

import { useState } from 'react';
import './infiniteCarousel.css';
import ectoplasma from '@/public/assets/img/ectoplasma.png';

export default function InfiniteCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const images = Array(90).fill(ectoplasma.src);

  return (
    <div className="infinite-carousel">
      <div className={`carousel-track ${isPaused ? 'paused' : ''}`}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="ectoplasma"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          />
        ))}
      </div>
    </div>
  );
}
