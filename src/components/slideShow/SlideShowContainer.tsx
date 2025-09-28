import { useState } from 'preact/hooks';
import { RightArrowIcon } from '../icons/RigthArrowSlideIcon';
import { LeftArrowIcon } from '../icons/LeftArrowSlideIcon';

interface SlideshowClientProps {
  slides: {
    id: number
    img: string
    alt: string
  }[]
}

export default function SlideshowClient ({ slides }: SlideshowClientProps) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div class="relative w-full h-96 overflow-hidden">
      <div
        class="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div class='w-full h-full shrink-0 flex justify-center items-center'>
            <div class='w-full sm:w-9/12 h-9/12 bg-dark-green rounded-2xl'>

            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        class="absolute top-1/2 left-4 transform -translate-y-1/2 hover:-translate-x-1 transition-transform cursor-pointer"
      >
        <LeftArrowIcon />
      </button>

      <button
        onClick={nextSlide}
        class="absolute top-1/2 right-4 transform -translate-y-1/2 hover:translate-x-1 cursor-pointer transition-transform"
      >
        <RightArrowIcon />
      </button>

      {/* Dots */}
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            class={`h-2 w-2 rounded-full ${i === current ? 'bg-accent' : 'bg-ligth-green'
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
}



