'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import React from 'react';
import Link from 'next/link';

export type DestinationCard = {
  id: number;
  title: string;
  subtitle: string;
  rating: string;
  reviews: string;
  price: string;
  image: string;
};

const dummyDestinations: DestinationCard[] = [
  {
    id: 1,
    title: "Plant Trees in the Aurès Mountains",
    subtitle: "Batna, Aurès Region | 2025-07-15 to 2025-08-05",
    rating: "4.8",
    reviews: "14/20 volunteers",
    price: "Free",
    image: "/home/carrousel/batna.jpg",
  },
  {
    id: 2,
    title: "Coastal Cleanup & Marine Awareness",
    subtitle: "Bejaia, Mediterranean Coast | 2025-08-10 to 2025-08-25",
    rating: "4.7",
    reviews: "22/30 volunteers",
    price: "6,750 DZD (materials and meals)",
    image: "/home/carrousel/bejaia.jpg",
  },
  {
    id: 3,
    title: "Teach English in the Sahara",
    subtitle: "Timimoun, Adrar | 2025-09-01 to 2025-09-30",
    rating: "4.9",
    reviews: "7/10 volunteers",
    price: "Free",
    image: "/home/carrousel/sahara.jpg",
  }
];

type DestinationsCarouselProps = {
  title: string;
  description: string;
};

export default function DestinationsCarousel({ title, description }: DestinationsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(false);

  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const pageY = 'touches' in e ? e.touches[0].pageY : e.pageY;

    setIsDragging(true);
    setStartX(pageX);
    setStartY(pageY);
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
    setIsHorizontal(false);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const move = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;

    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const pageY = 'touches' in e ? e.touches[0].pageY : e.pageY;

    const dx = pageX - startX;
    const dy = pageY - startY;

    if (!isHorizontal) {
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
        setIsHorizontal(true);
      } else {
        return;
      }
    }

    if ('touches' in e) e.preventDefault();
    carouselRef.current.scrollLeft = scrollLeft - dx;
  };

  return (
    <section className="relative w-full min-h-[700px] bg-[#B4D191] overflow-hidden my-16 flex flex-col sm:py-6">
      {/* Mobile Title */}
      <div className="block sm:hidden w-full text-center pt-16">
        <h2 className="text-4xl font-bold text-[#132A15] font-poppins">{title}</h2>
      </div>

      {/* Desktop Title + Description */}
      <div className="absolute top-0 left-0 z-20 pointer-events-none h-[700px] hidden sm:block ">
        <div className="h-full py-16">
          <div className="w-[65%] h-full pointer-events-auto">
            <div
              className="p-6 rounded-lg h-[600px] flex flex-col justify-center pl-[12%]"
              style={{
                background:
                  'linear-gradient(90deg, #B4D191 46.4%, rgba(180, 209, 145, 0.00) 100%)',
              }}
            >
              <h2 className="text-5xl font-bold text-[#132A15] mb-10 font-poppins min-w-[450px]">
                {title}
              </h2>
              <p className="text-xl leading-10 text-secondary font-poppins">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Carousel */}
      <div className="w-full h-full py-16 flex flex-1 items-end sm:items-center">
        <div
          ref={carouselRef}
          className="
            flex h-[350px] sm:h-[600px] gap-4 md:gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing
            px-4 sm:px-2 lg:pl-[45%] lg:pr-8 w-full
          "
          onMouseDown={startDragging}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={move}
          onTouchStart={startDragging}
          onTouchEnd={stopDragging}
          onTouchMove={move}
          style={{
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {dummyDestinations.map((destination, index) => (
            <div
              key={index}
              className="
                rounded-2xl relative snap-start
                w-[80vw] h-[350px] sm:min-w-[65%] sm:h-[500px] md:w-[400px] md:h-[600px] lg:min-w-[350px]
                bg-white shadow-lg overflow-hidden flex-shrink-0 transition-all duration-300 hover:shadow-xl
              "
            >
              <div className="relative w-full h-full z-0 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              </div>
              <div className="p-4 md:p-6 absolute inset-0 z-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-2xl font-bold mb-2 text-white text-shadow-black font-poppins">
                    {destination.title}
                  </h3>
                  <p className="text-sm md:text-base text-white mb-4 text-shadow-black">
                    {destination.subtitle}
                  </p>
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-400 text-shadow-black">★</span>
                    <span className="ml-1 text-sm text-white text-shadow-black">{destination.rating}</span>
                    <span className="text-white ml-1 text-sm md:text-base text-shadow-black">
                      ({destination.reviews})
                    </span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-full bg-primary/90 rounded-b-2xl py-4 flex justify-center shadow-lg">
                    <Link href={`/plans/${destination.id}`} className="w-full flex justify-center">
                      <button
                        className="px-6 py-2 text-base font-semibold text-white bg-transparent rounded-lg hover:bg-white/10 transition-colors text-shadow-black w-full"
                      >
                        RÉSERVER
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
  