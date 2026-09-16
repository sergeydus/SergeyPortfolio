import { skillGroups } from '@/content/portfolio'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <p className="section-kicker">04 / Capabilities</p>
        <h2 id="skills-heading" className="section-heading max-w-4xl">A stack is only useful when it moves the product.</h2>

        <div className="mt-14 border-t border-white/10">
          {skillGroups.map((group, index) => (
            <section key={group.id} aria-labelledby={`${group.id}-heading`} className="skill-row group grid gap-5 border-b border-white/10 py-7 sm:grid-cols-[4rem_0.7fr_1.5fr] sm:items-center sm:py-9">
              <span aria-hidden="true" className="font-mono text-xs font-bold text-slate-600">0{index + 1}</span>
              <h3 id={`${group.id}-heading`} className="text-xl font-black uppercase tracking-[-0.02em] text-white sm:text-2xl">{group.category}</h3>
              <ul className="flex flex-wrap gap-2 sm:justify-end">
                {group.items.map((item) => (
                  <li key={item} className="skill-chip border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.07em] text-slate-400 transition-colors group-hover:border-cyan-300/20 group-hover:text-slate-200">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
