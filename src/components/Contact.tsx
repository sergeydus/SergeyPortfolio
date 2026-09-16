import { profile } from '@/content/portfolio'

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="contact-section relative isolate overflow-hidden bg-[#030712] py-24 text-white sm:py-36">
      <div aria-hidden="true" className="contact-beam" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <p className="section-kicker">06 / Contact</p>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div className="min-w-0">
            <h2 id="contact-heading" className="max-w-5xl text-[clamp(3.4rem,8vw,8rem)] font-black uppercase leading-[0.84] tracking-[-0.07em]">
              Let&apos;s make<br /><span className="hero-gradient-text">something real.</span>
            </h2>
          </div>
          <div className="min-w-0 border-l border-white/10 pl-6">
            <p className="text-lg leading-8 text-slate-300">
              For professional enquiries, email is the fastest route. My public code is on GitHub.
            </p>
            <div className="mt-8 grid gap-3">
              <a href={`mailto:${profile.email}`} className="electric-button justify-between">
                Email Sergey <span aria-hidden="true">↗</span>
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub: Sergey Dushevski (opens in a new tab)"
                className="ghost-button justify-between"
              >
                View GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
