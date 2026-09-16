'use client'

import { useState } from 'react'
import { profile, proofPoints } from '@/content/portfolio'
import HeroField from '@/components/HeroField'

export default function Hero() {
  const [isMotionPaused, setIsMotionPaused] = useState(false)

  return (
    <section id="top" aria-labelledby="hero-heading" className="hero-shell relative isolate flex min-h-[100svh] overflow-hidden bg-[#030712] text-white">
      <HeroField paused={isMotionPaused} />
      <div aria-hidden="true" className="hero-vignette absolute inset-0" />
      <div aria-hidden="true" className="hero-orb hero-orb-one" />
      <div aria-hidden="true" className="hero-orb hero-orb-two" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-12">
        <div className="flex items-center justify-between gap-4 font-mono text-[0.66rem] font-bold uppercase tracking-[0.24em] text-cyan-300/80 sm:text-xs">
          <span>TLV / ISR</span>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden sm:inline">Full-stack · Mobile · Accessibility</span>
            <button
              type="button"
              aria-pressed={isMotionPaused}
              onClick={() => setIsMotionPaused((isPaused) => !isPaused)}
              className="motion-control"
            >
              <span aria-hidden="true" className="motion-control-mark" />
              {isMotionPaused ? 'Play motion' : 'Pause motion'}
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-center py-16 sm:py-20">
          <div className="min-w-0 w-full">
            <p className="hero-reveal mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.95)]" />
              Available for ambitious product work
            </p>
            <h1 id="hero-heading" className="hero-title hero-reveal hero-reveal-delay-1 max-w-7xl text-[clamp(3.8rem,11vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.075em]">
              <span className="block text-white">Sergey</span>
              <span className="hero-gradient-text block pb-[0.14em]">Dushevski</span>
            </h1>

            <div className="hero-reveal hero-reveal-delay-2 mt-6 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-end">
              <div className="min-w-0">
                <p className="text-xl font-bold text-white sm:text-2xl">{profile.title}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">{profile.experienceLabel}</p>
              </div>
              <div className="hero-copy-panel">
                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{profile.summary}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#experience" className="electric-button group">
                    Explore experience
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                  <a href="#contact" className="ghost-button">Start a conversation</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav aria-label="Selected evidence" className="hero-reveal hero-reveal-delay-3 grid border-y border-white/10 bg-slate-950/35 backdrop-blur-md md:grid-cols-3">
          {proofPoints.map((point, index) => (
            <a key={point.id} href={point.href} className="group relative px-5 py-5 transition-colors hover:bg-cyan-300/[0.07] md:px-6 md:[&:not(:last-child)]:border-r md:[&:not(:last-child)]:border-white/10">
              <span className="font-mono text-[0.65rem] font-bold text-cyan-300/70">0{index + 1}</span>
              <span className="mt-2 block text-sm font-bold uppercase tracking-[0.1em] text-white">{point.label}</span>
              <span className="mt-1.5 block text-sm leading-6 text-slate-400 transition-colors group-hover:text-slate-200">{point.detail}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
