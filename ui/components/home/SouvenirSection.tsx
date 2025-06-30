"use client"

import React from 'react'
import Image from 'next/image'

// Dummy data for souvenirs
const souvenirs = [
  {
    src: '/home/souvenir/yemma_gouraya.png',
    alt: 'Yemma Gouraya',
    label: 'Yemma Gouraya',
    grid: 'col-span-2 row-span-2 md:col-span-2 md:row-span-4'
  },
  {
    src: '/home/souvenir/plageAftis.png',
    alt: 'Plage Aftis',
    label: 'Plage Aftis',
    grid: 'col-span-2 row-span-1 md:col-start-3 md:col-span-4 md:row-span-2'
  },
  {
    src: '/home/souvenir/skikda.png',
    alt: 'Skikda',
    label: 'Skikda',
    grid: 'col-span-1 row-span-1 md:col-start-3 md:col-span-2 md:row-start-3 md:row-span-2'
  },
  {
    src: '/home/souvenir/medea.jpg',
    alt: 'Medéa',
    label: 'Medéa',
    grid: 'col-span-1 row-span-1 md:col-start-5 md:col-span-2 md:row-start-3 md:row-span-2'
  },
  {
    src: '/home/souvenir/taghit.png',
    alt: 'Taghit',
    label: 'Taghit',
    grid: 'col-span-2 row-span-1 md:col-span-6 md:row-start-5 md:row-span-2'
  }
]

function SouvenirSection() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-2 sm:px-6 md:px-10 pb-[100px] sm:pb-[280px] relative overflow-hidden mt-12">
      <div className="text-center mb-20">
        <span className="text-black text-3xl sm:text-5xl font-semibold font-['Poppins'] leading-[50px] sm:leading-[80px] block">
          Our Volunteer Memories<br />
        </span>
        <span className="text-black text-xl sm:text-3xl font-light font-['Poppins'] leading-[40px] sm:leading-[80px] block">
          Filled with impact, connection, and purpose.        </span>
      </div>
      <div className="
        relative
        grid 
        grid-cols-2 grid-rows-5 
        gap-3 sm:gap-8 
        w-full 
        h-[900px] sm:h-[1500px] 
        md:grid-cols-6 md:grid-rows-6
      ">
        {souvenirs.map((item, idx) => (
          <div
            key={item.alt}
            className={`
              ${item.grid}
              rounded-[20px] flex items-end justify-center p-2 sm:p-8
              relative overflow-hidden min-h-0 min-w-0 w-full h-full
            `}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover z-0"
              style={{ borderRadius: 20 }}
              priority
            />
            <span className="relative z-10 text-white text-base sm:text-2xl md:text-3xl drop-shadow-lg">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SouvenirSection