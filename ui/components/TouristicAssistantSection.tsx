import React, { useRef } from 'react';

interface TouristicAssistantSectionProps {
  handleAskAi: () => void;
}

const TouristicAssistantSection: React.FC<TouristicAssistantSectionProps> = ({ handleAskAi }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax/gradient shift effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    section.style.background = `radial-gradient(circle at ${percentX * 100}% ${percentY * 100}%, #B4D191 0%, #256326 100%)`;
  };
  const handleMouseLeave = () => {
    if (sectionRef.current) {
      sectionRef.current.style.background = 'linear-gradient(135deg, #B4D191 0%, #256326 100%)';
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-[340px] flex justify-center items-center rounded-3xl shadow-2xl my-20 transition-all duration-500"
      style={{
        background: 'linear-gradient(135deg, #B4D191 0%, #256326 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleAskAi}
        className="px-14 py-8 rounded-2xl bg-[#256326] hover:bg-[#B4D191] text-white hover:text-[#256326] text-3xl font-extrabold shadow-2xl hover:shadow-green-400/60 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300/30 tracking-wide flex items-center gap-4 transform hover:scale-105"
        style={{ boxShadow: '0 8px 32px 0 rgba(40, 100, 40, 0.25)' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Get Your Touristic Assistant
      </button>
    </section>
  );
};

export default TouristicAssistantSection; 