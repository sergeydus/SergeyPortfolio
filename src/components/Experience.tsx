import Image from 'next/image'
import { experiences } from '@/content/portfolio'
import { withBasePath } from '@/lib/site'

function AchievementList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
          <span aria-hidden="true" className="mt-[0.65rem] h-px w-5 shrink-0 bg-cyan-300/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-dark relative py-24 sm:py-32">
      <div aria-hidden="true" className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-[130px]" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">02 / Experience</p>
            <h2 id="experience-heading" className="section-heading max-w-lg">Systems, shipped.</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-slate-400">
              Product delivery across mobile, frontend, backend, accessibility, and the engineering practices connecting them.
            </p>
          </div>

          <div className="experience-rail min-w-0">
            {experiences.map((experience, index) => (
              <article key={experience.id} className="experience-entry relative min-w-0 pb-14 pl-8 sm:pl-12">
                <span aria-hidden="true" className="experience-node"><i /></span>
                <span aria-hidden="true" className="experience-index">0{index + 1}</span>
                <header className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <p className="font-mono text-[0.67rem] font-bold uppercase tracking-[0.2em] text-cyan-300/80">0{index + 1} / {experience.company}</p>
                    <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-white sm:text-4xl">{experience.title}</h3>
                  </div>
                  <p className="w-fit border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[0.67rem] font-bold uppercase tracking-[0.1em] text-slate-400">
                    {experience.period}
                  </p>
                </header>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{experience.description}</p>
                {experience.achievements && <AchievementList items={experience.achievements} />}

                {experience.projects && (
                  <div className="mt-8 grid gap-4">
                    {experience.projects.map((project) => (
                      <section
                        key={project.id}
                        aria-labelledby={`${project.id}-heading`}
                        className={`project-slice experience-project-card experience-project-card-${project.id} min-w-0 overflow-hidden border border-white/10 bg-white/[0.025]`}
                      >
                        {project.image && (
                          <div className={`experience-project-media experience-project-media-${project.id}`}>
                            <Image
                              src={withBasePath(project.image.src)}
                              alt={project.image.alt}
                              fill
                              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 60vw, 100vw"
                              style={{
                                objectFit: project.image.fit ?? 'cover',
                                objectPosition: project.image.position ?? 'center',
                              }}
                            />
                          </div>
                        )}
                        <div className="p-5 sm:p-7">
                          <span aria-hidden="true" className="mb-8 block h-1 w-8 bg-violet-400" />
                          <h4 id={`${project.id}-heading`} className="text-xl font-black text-white">{project.name}</h4>
                          <p className="mt-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-cyan-300">{project.role}</p>
                          <p className="mt-4 text-sm leading-6 text-slate-400">{project.description}</p>
                          <AchievementList items={project.achievements} />
                          {project.publicUrl && (
                            <a
                              href={project.publicUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View public product: ${project.name} (opens in a new tab)`}
                              className="experience-source-link"
                            >
                              View public product
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </div>
                      </section>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
