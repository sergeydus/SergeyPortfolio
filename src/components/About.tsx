import { certifications, languages, profile } from '@/content/portfolio'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-dark relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="section-kicker">01 / Profile</p>
            <h2 id="about-heading" className="section-heading max-w-xl">
              I build at the <span className="text-cyan-300">seams.</span>
            </h2>
            <div className="mt-10 grid grid-cols-3 border-y border-white/10 py-6">
              <div>
                <span className="block text-3xl font-black text-white sm:text-5xl">7+</span>
                <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-widest text-slate-400">Years</span>
              </div>
              <div className="border-x border-white/10 px-5">
                <span className="block text-3xl font-black text-white sm:text-5xl">3</span>
                <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-widest text-slate-400">Surfaces</span>
              </div>
              <div className="pl-5">
                <span className="block text-3xl font-black text-white sm:text-5xl">AA</span>
                <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-widest text-slate-400">A11y focus</span>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-6 text-xl leading-9 text-slate-300 sm:text-2xl sm:leading-10">
              <p className="text-white">{profile.summary}</p>
              <p>
                My best work happens where mobile interfaces, web applications, backend services, and delivery systems meet.
              </p>
              <p className="text-slate-400">
                I turn complex constraints into clear product behavior, then leave the system easier for the next engineer to understand and extend.
              </p>
            </div>

            <aside className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Certifications</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                  {certifications.map((certification) => <li key={certification}>{certification}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-violet-300">Languages</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                  {languages.map((language) => <li key={language}>{language}</li>)}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
