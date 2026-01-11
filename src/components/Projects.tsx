const projects = [
  {
    title: 'FirstOffer',
    company: 'Ad-Tech Platform',
    description: 'Led Vue 2 to Vue 3 migration and optimized backend queries reducing load times by 80%. Developed internal tools for ad-tech solutions.',
    technologies: ['Vue 3', 'NestJS', 'TypeScript', 'Performance Optimization'],
    link: 'https://firstofferz.com/',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Mekome',
    company: 'ABRA',
    description: 'Customizable platform enabling municipalities to communicate with residents via mobile and web apps. Improved app boot-speed by up to 60%.',
    technologies: ['React', 'React Native', 'TypeScript', 'Mobile Development'],
    link: 'https://mekome.net/',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    title: 'Supplant',
    company: 'ABRA',
    description: 'Agri-tech platform providing precision irrigation solutions using sensor-based and AI-driven technology with user-friendly dashboards.',
    technologies: ['React', 'React Native', 'IoT Integration', 'Data Visualization'],
    link: 'https://supplant.me/',
    gradient: 'from-teal-500 to-emerald-500',
  },
  {
    title: 'Sparko',
    company: 'ABRA',
    description: 'UK-based virtual retirement community platform with custom Android set-top box, mobile apps, and embedded video calling for elderly users.',
    technologies: ['React Native', 'Android', 'Video Integration', 'Accessibility'],
    link: 'https://initech.co.il/en/portfolio/ageing-tech-web-mobile-smart-tv-application/',
    gradient: 'from-blue-500 to-indigo-500',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden hover:-translate-y-2"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${project.gradient}`}>
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                      {project.company}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-100 transition-opacity`}></div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-lg font-semibold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent group-hover:gap-4 transition-all duration-300`}
                >
                  View Project
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Company links section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">Companies I&apos;ve worked with:</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://www.abra-it.com/en/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 font-semibold text-gray-700 dark:text-gray-300">
              ABRA
            </a>
            <a href="https://firstofferz.com/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 font-semibold text-gray-700 dark:text-gray-300">
              FirstOffer
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
