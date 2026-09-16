import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#030712]">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer className="flex flex-col gap-2 border-t border-white/10 bg-[#030712] px-5 py-7 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <span>© {new Date().getFullYear()} Sergey Dushevski</span>
        <span>Built with Next.js / Designed with intent</span>
      </footer>
    </>
  )
}
