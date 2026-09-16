import Image from 'next/image'
import { education } from '@/content/portfolio'
import { withBasePath } from '@/lib/site'

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="relative overflow-hidden bg-[#c7ff52] py-20 text-[#07110b] sm:py-24">
      <div aria-hidden="true" className="education-type">CS</div>
      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:px-12">
        <div className="min-w-0">
          <p className="font-mono text-xs font-black uppercase tracking-[0.2em]">05 / Education</p>
          <h2 id="education-heading" className="mt-4 text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-7xl">Academic<br />foundation.</h2>
        </div>

        <article className="grid min-w-0 gap-6 border-l-4 border-[#07110b] bg-[#07110b] p-6 text-white shadow-[16px_16px_0_rgba(7,17,11,0.18)] sm:grid-cols-[180px_1fr] sm:items-center sm:p-8">
          <div className="flex min-h-28 items-center justify-center bg-white p-4">
            <Image src={withBasePath('/telhai-logo.svg')} alt="Tel-Hai College" width={180} height={72} unoptimized className="h-auto w-full object-contain" />
          </div>
          <div className="min-w-0">
            <h3 className="text-2xl font-black uppercase leading-tight tracking-[-0.03em] sm:text-3xl">{education.degree}</h3>
            <p className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#c7ff52]">{education.institution}</p>
            <p className="mt-2 text-slate-400">{education.period}</p>
          </div>
        </article>
      </div>
    </section>
  )
}
