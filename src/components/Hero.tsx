'use client'

import { useState } from 'react'
import Hero2 from './Hero2'

export default function Hero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [backgroundMode] = useState<'lens' | 'hero2'>(() => (
    Math.random() < 0.5 ? 'lens' : 'hero2'
  ))

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 20
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height * 20
    setOffset({ x, y })
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900"
      onMouseMove={backgroundMode === 'lens' ? handleMouseMove : undefined}
    >
      {backgroundMode === 'hero2' && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Hero2 />
        </div>
      )}

      {backgroundMode === 'lens' && (
        <>
          {/* Lens flare hover effect */}
          <div
            className="absolute inset-0 transition-all duration-500 ease-out pointer-events-none"
            style={{
              background: `radial-gradient(circle 600px at ${50 + offset.x}% ${50 + offset.y}%, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.15) 40%, transparent 70%)`,
              transform: `translate(${offset.x}px, ${offset.y}px)`
            }}
          />

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-300 dark:bg-teal-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </>
      )}

      {/* Blend gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white dark:to-gray-900 pointer-events-none z-20" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in-up pointer-events-none">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 pb-2">
            Sergey Dushevski
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 mb-4 font-semibold">
            Fullstack Developer
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12">
            6+ Years Building High-Performance Applications
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group pointer-events-auto bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
            >
              Get In Touch
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group pointer-events-auto border-2 border-cyan-600 text-cyan-600 dark:text-cyan-400 dark:border-cyan-400 px-8 py-4 rounded-full hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-600 transition-all duration-300 font-semibold flex items-center gap-2"
            >
              View Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
