'use client';

import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2, 
  Download,
  Eye,
  Brush,
  Camera,
  Layers
} from 'lucide-react';

interface ArtItem {
  id: string;
  title: string;
  category: 'Paintings' | 'Illustrations' | 'Photography' | 'Visual Experiments';
  year: string;
  medium: string;
  description: string;
  previewBg: string;
}

export const ArtWindow: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const artworks: ArtItem[] = [
    {
      id: 'art-1',
      title: 'Monochromatic Form Study',
      category: 'Paintings',
      year: '2023',
      medium: 'Oil on Canvas & Digital Rendering',
      description: 'An exploration of shadow gradients and optical weight using geometric chiaroscuro.',
      previewBg: 'from-amber-600 via-orange-700 to-stone-900',
    },
    {
      id: 'art-2',
      title: 'Spatial UI Glass Dynamics',
      category: 'Visual Experiments',
      year: '2025',
      medium: 'Figma & 3D Shaders',
      description: 'Prototyping spatial translucency, backdrop blur reflections, and light refraction for OS surfaces.',
      previewBg: 'from-sky-500 via-indigo-600 to-purple-900',
    },
    {
      id: 'art-3',
      title: 'Human-Centered Ergonomics Illustration',
      category: 'Illustrations',
      year: '2024',
      medium: 'Vector & Digital Ink',
      description: 'Editorial vector artwork illustrating cognitive load and intent hierarchy in digital interfaces.',
      previewBg: 'from-emerald-500 via-teal-700 to-zinc-900',
    },
    {
      id: 'art-4',
      title: 'Urban Light & Architecture Study',
      category: 'Photography',
      year: '2024',
      medium: '35mm Street Photography',
      description: 'Capturing structural symmetry and shadows in modern architectural spaces.',
      previewBg: 'from-zinc-700 via-slate-800 to-black',
    },
    {
      id: 'art-5',
      title: 'AI Generative Form Synthesis',
      category: 'Visual Experiments',
      year: '2025',
      medium: 'Midjourney & Photoshop Composite',
      description: 'Blending organic biological forms with crisp mathematical UI bounding boxes.',
      previewBg: 'from-purple-600 via-pink-600 to-rose-900',
    },
    {
      id: 'art-6',
      title: 'Fine Art Portrait Series',
      category: 'Paintings',
      year: '2022',
      medium: 'Acrylic & Mixed Media',
      description: 'Exhibited painting exploring facial expressions and color temperature transitions.',
      previewBg: 'from-red-600 via-amber-700 to-yellow-900',
    },
  ];

  const categories = ['All', 'Paintings', 'Illustrations', 'Photography', 'Visual Experiments'];

  const filteredArtworks = activeCategory === 'All'
    ? artworks
    : artworks.filter((a) => a.category === activeCategory);

  const selectedArt = selectedIndex !== null ? filteredArtworks[selectedIndex] : null;

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : filteredArtworks.length - 1));
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! < filteredArtworks.length - 1 ? prev! + 1 : 0));
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-white select-text overflow-hidden">
      {/* Top Gallery Header */}
      <div className="p-5 bg-gradient-to-r from-rose-950/80 via-zinc-900 to-purple-950 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">Art & Visuals Gallery</h1>
            <p className="text-xs text-zinc-400 font-mono">Paintings, illustrations, photography & visual experiments</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-rose-500 text-white shadow-md font-semibold'
                  : 'bg-white/5 hover:bg-white/15 text-zinc-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Artwork Grid */}
      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredArtworks.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedIndex(index)}
            className="group relative p-3 bg-zinc-900/80 border border-white/10 hover:border-rose-400/60 rounded-2xl transition-all duration-200 hover:shadow-2xl hover:shadow-rose-500/20 cursor-pointer flex flex-col space-y-3"
          >
            {/* Visual Preview Canvas */}
            <div className={`h-48 rounded-xl bg-gradient-to-tr ${item.previewBg} p-4 flex flex-col justify-between shadow-inner relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-black/50 backdrop-blur-md text-[10px] font-mono font-bold text-white rounded-full border border-white/20">
                  {item.category}
                </span>
                <span className="p-1.5 bg-black/40 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-[11px] font-mono text-zinc-200 drop-shadow">
                {item.medium}
              </div>
            </div>

            <div className="px-1">
              <h2 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                {item.title}
              </h2>
              <p className="text-xs text-zinc-400 font-mono">{item.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Focused Lightbox Modal Viewer */}
      {selectedArt && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl p-6 flex flex-col items-center justify-between select-none"
        >
          {/* Top Bar Controls */}
          <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 text-xs">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-mono font-bold">
                {selectedArt.category}
              </span>
              <span className="font-bold text-white text-sm">{selectedArt.title}</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-zinc-400 font-mono text-[11px]">
                {selectedIndex! + 1} of {filteredArtworks.length}
              </span>
              <button
                onClick={() => setSelectedIndex(null)}
                className="p-1.5 bg-white/15 hover:bg-rose-600 rounded-full text-white transition-colors"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Visual Display Stage */}
          <div className="relative flex-1 w-full max-w-4xl flex items-center justify-between py-6 px-4">
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="p-3 bg-white/10 hover:bg-white/25 rounded-full text-white transition-all transform hover:scale-110 shadow-2xl backdrop-blur-md"
              title="Previous Artwork"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Central Canvas Frame */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl h-80 md:h-96 rounded-2xl bg-gradient-to-tr ${selectedArt.previewBg} p-8 flex flex-col justify-between shadow-2xl border border-white/20 relative overflow-hidden`}
            >
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-black/60 rounded-lg text-xs font-mono text-white backdrop-blur-md border border-white/15">
                  {selectedArt.medium}
                </span>
                <span className="text-xs font-mono text-zinc-300">{selectedArt.year}</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white drop-shadow-md">{selectedArt.title}</h3>
                <p className="text-xs text-zinc-200 leading-relaxed drop-shadow max-w-lg">{selectedArt.description}</p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="p-3 bg-white/10 hover:bg-white/25 rounded-full text-white transition-all transform hover:scale-110 shadow-2xl backdrop-blur-md"
              title="Next Artwork"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="w-full text-center text-xs font-mono text-zinc-400">
            Use Left/Right Arrow Keys or buttons to navigate gallery
          </div>
        </div>
      )}
    </div>
  );
};
