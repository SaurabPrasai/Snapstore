"use client";
import React, { useState } from "react";
import { cn } from "../lib/utils";

export const Card = React.memo(({
  card,
  index,
  hovered,
  setHovered,
  selected,
  setSelected
}) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    onClick={() => setSelected(selected === index ? null : index)}
    className={cn(
      "rounded-xl relative bg-white dark:bg-neutral-800 overflow-hidden w-full shadow-md transition-all duration-300 ease-out cursor-pointer hover:shadow-lg",
      hovered !== null && hovered !== index && selected !== index && "blur-sm scale-[0.98] opacity-75"
    )}>
    <div className="relative flex flex-col">
      <img
        src={card.src}
        alt={card.title}
        className="w-full h-auto object-contain rounded-t-xl"
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end py-6 px-4 transition-opacity duration-300",
          hovered === index || selected === index ? "opacity-100" : "opacity-0"
        )}>
        <div className=" text-xl  font-display text-white drop-shadow-md">
          {card.title}
        </div>
      </div>
    </div>
  </div>
));

Card.displayName = "Card";

export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  return (
    <div className="relative min-h-screen bg-gray-100 py-12 flex flex-col items-center justify-start">
      {/* Single Quote at the Top */}
      <div className="text-center mb-10 px-4 max-w-3xl">
        <blockquote className="text-xl md:text-2xl font-medium font-display text-gray-700 italic">
          "The best thing about a picture is that it never changes, even if the people in it do"
        </blockquote>
        <p className="text-sm text-gray-500 mt-2 font-display ">— Andy Warhol</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full px-4 md:px-8 items-start">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>

      {/* Selected Image Overlay */}
      {selected !== null && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div 
            className="relative max-w-md w-full max-h-[85vh] overflow-hidden rounded-xl shadow-2xl bg-white transform transition-all duration-300 scale-100"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={cards[selected].src}
              alt={cards[selected].title}
              className="w-full h-auto object-contain rounded-t-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 px-6 rounded-b-xl">
              <div className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
                {cards[selected].title}
              </div>
            </div>
            <button
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors duration-200"
              onClick={() => setSelected(null)}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}