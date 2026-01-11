'use client'

import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    title: 'Frontend Developer',
    company: 'Freelance',
    period: 'January 2025 - Current',
    description: 'Working on various frontend projects as a freelance developer.',
    achievements: [
      'Building modern web applications with latest technologies',
      'Delivering user-centric solutions',
    ],
    image: null,
  },
  {
    title: 'Full-stack Developer',
    company: 'FirstOffer',
    period: 'June 2023 - December 2024',
    description: 'Full-stack development of ad-tech solutions using Vue 2/3 and NestJS.',
    achievements: [
      'Led migration from Vue 2 to Vue 3, improving maintainability and reducing bugs',
      'Optimized backend queries, reducing system load times by up to 80%',
      'Developed internal tools for ad-tech platform',
    ],
    image: null,
  },
  {
    title: 'Full-stack Developer - Mekome',
    company: 'ABRA',
    period: 'December 2018 - June 2023',
    description: 'A community-focused communication platform designed to streamline local interactions between municipalities and residents. Features unified messaging, digital voting, issue reporting, and financial statements.',
    achievements: [
      'Improved app boot-speed by up to 60%',
      'Developed mobile and web interfaces using React and React Native',
      'Built responsive components with focus on performance and usability',
    ],
    image: 'https://sergeydus.github.io/Portfolio/_next/static/media/mekome_1.7f79a9e1.png',
  },
  {
    title: 'Full-stack Developer - Supplant',
    company: 'ABRA',
    period: 'December 2018 - June 2023',
    description: 'Agri-tech platform providing real-time insights and personalized irrigation recommendations based on sensor data and AI. Built intuitive dashboards for monitoring plant stress, soil moisture, and weather conditions.',
    achievements: [
      'Built responsive mobile and frontend components for precision agriculture tools',
      'Integrated sensor data into user-friendly dashboards',
      'Developed real-time monitoring features with alerts and guidance',
    ],
    image: 'https://sergeydus.github.io/Portfolio/_next/static/media/supplant_app.80764028.webp',
  },
  {
    title: 'Mobile Developer - Sparko',
    company: 'ABRA',
    period: 'December 2018 - June 2023',
    description: 'UK-based virtual retirement community platform with custom Android set-top box. Helps older adults stay socially connected through live classes, social events, video calls, and messaging services.',
    achievements: [
      'Maintained virtual retirement app with optimized accessibility features',
      'Developed intuitive interface for seniors using TV set-top box',
      'Implemented embedded video calling features',
    ],
    image: 'https://sergeydus.github.io/Portfolio/_next/static/media/TV1.a6674d79.svg',
    image2: 'https://sergeydus.github.io/Portfolio/_next/static/media/TV2.21b66ed1.svg',
  },
]

export default function Experience() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCards((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.2 }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (card && observerRef.current) {
        observerRef.current.observe(card)
      }
    })
  }, [])

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400">
          Professional Journey
        </h2>
        <div className="max-w-6xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el }}
              data-index={index}
              className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className={`flex flex-col ${exp.image ? 'md:flex-row' : ''} gap-6 p-8`}>
                {/* Image Section */}
                {exp.image && (
                  <div className="md:w-80 flex-shrink-0">
                    <div className="relative h-64 md:h-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700">
                      {exp.image2 ? (
                        // Animated transition for dual images
                        <div className="relative w-full h-full">
                          <img
                            src={exp.image2}
                            alt={`${exp.title} - 2`}
                            className={`absolute inset-0 w-full h-full object-contain p-4 z-10 ${visibleCards.has(index) ? 'animate-fade-in-out-once-delayed' : 'opacity-0'}`}
                          />
                          <img
                            src={exp.image}
                            alt={`${exp.title} - 1`}
                            className={`absolute inset-0 w-full h-full object-contain p-4 z-20 ${visibleCards.has(index) ? 'animate-fade-in-out-once' : 'opacity-100'}`}
                          />
                        </div>
                      ) : (
                        // Single static image
                        <img
                          src={exp.image}
                          alt={exp.title}
                          className="w-full h-full object-contain p-4"
                        />
                      )}
                    </div>
                  </div>
                )}
                
                {/* Content Section */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full font-medium">
                      {exp.period}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
