'use client'

import { useEffect, useRef, useState } from 'react'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
] as const

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#030712]/75 text-white backdrop-blur-xl">
      <span aria-hidden="true" className="scroll-progress" />
      <nav aria-label="Primary navigation" className="mx-auto max-w-[1500px] px-5 py-3 sm:px-8 lg:px-12">
        <div className="flex min-h-11 items-center justify-between gap-4">
          <a
            href="#top"
            className="group rounded-md font-mono text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:text-cyan-300 sm:text-sm"
          >
            <span className="mr-2 inline-block h-2 w-2 bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)] transition-transform group-hover:rotate-45" />
            Sergey.D
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 font-mono text-[0.66rem] font-bold uppercase tracking-[0.13em] text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-cyan-300"
              >
                <span aria-hidden="true" className="mr-1.5 text-slate-400/80">0{index + 1}</span>{item.name}
              </a>
            ))}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-cyan-300 hover:bg-cyan-300/10 lg:hidden"
          >
            <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          id="mobile-navigation"
          hidden={!isMobileMenuOpen}
          className="border-t border-white/10 py-3 lg:hidden"
        >
          <div className="grid gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-11 items-center rounded-lg px-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-slate-300 hover:bg-white/[0.06] hover:text-cyan-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
