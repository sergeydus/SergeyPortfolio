import Image from 'next/image'
import { projects } from '@/content/portfolio'
import { withBasePath } from '@/lib/site'
import type { PortfolioProject, ProjectAccent } from '@/types/portfolio'

const accentStyles: Record<ProjectAccent, { label: string; glow: string; line: string }> = {
  blue: { label: 'text-cyan-300', glow: 'project-glow-blue', line: 'bg-cyan-300' },
  green: { label: 'text-emerald-300', glow: 'project-glow-green', line: 'bg-emerald-300' },
  orange: { label: 'text-orange-300', glow: 'project-glow-orange', line: 'bg-orange-300' },
  purple: { label: 'text-fuchsia-300', glow: 'project-glow-purple', line: 'bg-fuchsia-300' },
}

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>
}

function ProjectArtwork({ project }: { project: PortfolioProject }) {
  if (project.image) {
    const isStandaloneArtwork = project.id === 'dither-it'

    return (
      <div className={`project-art ${isStandaloneArtwork ? 'project-image-art' : 'project-screenshot'}`}>
        <Image
          src={withBasePath(project.image.src)}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          style={{
            objectFit: project.image.fit ?? 'cover',
            objectPosition: project.image.position ?? 'center',
          }}
        />
        {!isStandaloneArtwork && (
          <>
            <span aria-hidden="true" className="screenshot-chrome"><i /><i /><i /></span>
            <span aria-hidden="true" className="art-caption">LIVE PROJECT / CAPTURE</span>
          </>
        )}
      </div>
    )
  }

  if (project.id === 'agent-bridge') {
    return (
      <div aria-hidden="true" className="project-art bridge-art">
        <div className="bridge-orbit bridge-orbit-one" />
        <div className="bridge-orbit bridge-orbit-two" />
        <div className="bridge-terminal">
          <span className="bridge-prompt">$ agent-bridge</span>
          <span><b>codex</b> implementation ready</span>
          <span><em>claude</em> reviewing patch...</span>
          <span className="bridge-agreement">reciprocal agreement / reached</span>
        </div>
        <span className="bridge-mark">A/B</span>
        <span className="art-caption">TWO AGENTS / ONE WORKTREE</span>
      </div>
    )
  }

  if (project.id === 'angular-packages') {
    return (
      <div aria-hidden="true" className="project-art packages-art">
        <div className="terminal-window">
          <span>$ npm i @sergeydus/</span>
          <strong>signals-utils</strong>
          <span className="terminal-cursor">_</span>
        </div>
        <span className="package-mark">NG</span>
        <span className="art-caption">SMALL TOOLS / SHARP EDGES</span>
      </div>
    )
  }

  return null
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="section-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="section-kicker">03 / Selected work</p>
            <h2 id="projects-heading" className="section-heading">Things made to be <span className="text-violet-300">used.</span></h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-400 lg:justify-self-end">
            Recent tools and product experiments—from local agent coordination to game utilities, interaction design, and framework ergonomics.
          </p>
        </div>

        <div className="project-grid mt-10 grid gap-5 lg:grid-cols-12">
          {projects.map((project, index) => {
            const styles = accentStyles[project.accent]
            return (
              <article key={project.id} className={`project-card group relative overflow-hidden border border-white/10 bg-[#0b1020] ${styles.glow}`}>
                <ProjectArtwork project={project} />
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400">Project 0{index + 1}</span>
                      <h3 className={`mt-2 text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl ${styles.label}`}>{project.title}</h3>
                    </div>
                    <span aria-hidden="true" className={`mt-2 h-3 w-3 shrink-0 rotate-45 ${styles.line}`} />
                  </div>

                  <p className="mt-5 max-w-2xl leading-7 text-slate-300">{project.description}</p>
                  <ul aria-label={`${project.title} technologies`} className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-slate-400">
                    {project.technologies.map((technology) => <li key={technology}>+ {technology}</li>)}
                  </ul>

                  {project.kind === 'packages' && (
                    <div className="mt-7 grid gap-2">
                      {project.packages.map((packageItem) => (
                        <a key={packageItem.id} href={packageItem.url} target="_blank" rel="noopener noreferrer" className="group/package flex items-center justify-between gap-4 border-t border-white/10 py-4">
                          <span>
                            <span className="block font-mono text-sm font-bold text-orange-300">{packageItem.name}</span>
                            <span className="mt-1 block text-sm text-slate-400">{packageItem.description}</span>
                            <span className="sr-only"> (opens in a new tab)</span>
                          </span>
                          <ExternalArrow />
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.kind === 'demo' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Launch project: ${project.title} (opens in a new tab)`}
                        className="project-link-primary"
                      >
                        Launch project
                        <ExternalArrow />
                      </a>
                    )}
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Source: ${project.title} (opens in a new tab)`}
                      className="project-link-secondary"
                    >
                      Source
                      <ExternalArrow />
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
