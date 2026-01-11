const projects = [
  {
    title: 'Domino Fill',
    description: 'An interactive puzzle game where players strategically place domino tiles to fill a grid. Built with modern web technologies for smooth gameplay and responsive design.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Vercel'],
    link: 'https://domino-fill.vercel.app/',
    github: 'https://github.com/sergeydus/domino_fill',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'GreenPark',
    description: 'A modern Next.js web application for eco-friendly parking solutions that combines sustainability with cutting-edge technology. Features solar integration, water management, smart IoT-enabled parking optimization, and EV charging infrastructure.',
    technologies: ['Next.js', 'TypeScript', 'React', 'CSS3'],
    link: 'https://sergeydus.github.io/GreenPark/',
    github: 'https://github.com/sergeydus/GreenPark',
    gradient: 'from-green-500 to-emerald-500',
    logo: 'greenpark',
  },
  {
    title: 'Angular + Tailwind Packages',
    description: 'A collection of modern Angular utilities and workspace setup.',
    technologies: ['Angular', 'Tailwind CSS', 'TypeScript', 'NPM Packages'],
    link: 'https://github.com/sergeydus/ng-tailwind-workspace',
    github: 'https://github.com/sergeydus/ng-tailwind-workspace',
    gradient: 'from-red-500 to-orange-500',
    packages: [
      { 
        name: '@sergeydus/ng-signals-utils',
        url: 'https://www.npmjs.com/package/@sergeydus/ng-signals-utils',
        description: 'Reactive programming utilities for Angular signals'
      },
      { 
        name: 'ng-tailwind-merge',
        url: 'https://www.npmjs.com/package/ng-tailwind-merge',
        description: 'Dynamic class management with Tailwind CSS'
      },
    ],
  },
  {
    title: 'DitherIT',
    description: 'Image processing tool that applies dithering algorithms to transform images. Explores classic computer graphics techniques with modern web APIs.',
    technologies: ['JavaScript', 'Canvas API', 'Image Processing'],
    link: 'https://sergeydus.github.io/DitherIT/',
    github: 'https://github.com/sergeydus/DitherIT',
    gradient: 'from-purple-500 to-pink-500',
    pixelated: true,
    pixelColor: '#00FF00',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16">
          <span className="inline-block text-transparent bg-clip-text" style={{
            backgroundImage: 'linear-gradient(to right, #3b82f6, #22c55e, #ef4444)'
          }}>
            Side Projects
          </span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto items-start">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border overflow-hidden hover:-translate-y-2 ${
                project.pixelated 
                  ? 'border-4 border-dashed' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              style={project.pixelated ? { 
                borderColor: project.pixelColor,
                imageRendering: 'pixelated',
              } : {}}
            >
              {/* Gradient overlay */}
              {!project.pixelated && (
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              )}
              {project.pixelated && (
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: project.pixelColor }}
                ></div>
              )}
              
              <div className="relative z-10">
                <div className="mb-4">
                  <h3 className={`text-3xl font-bold mb-2 ${
                      project.pixelated
                        ? 'font-mono'
                        : 'text-transparent bg-clip-text bg-gradient-to-r'
                    } ${project.gradient}`}
                      style={project.pixelated ? { color: project.pixelColor } : {}}
                    >
                      {project.title}
                    </h3>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 ${
                        project.pixelated ? 'font-mono' : ''
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {project.packages && (
                  <div className="mb-6 space-y-3">
                    {project.packages.map((pkg: any, pkgIdx: number) => (
                      <a
                        key={pkgIdx}
                        href={pkg.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 transition-all hover:shadow-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-2xl">📦</span>
                              <span className="font-mono font-bold text-orange-600 dark:text-orange-400">
                                {pkg.name}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 pl-8">
                              {pkg.description}
                            </p>
                          </div>
                          <span className="text-orange-500 ml-4">→</span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
                
                {!project.packages && (
                  <div className="flex gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-lg font-semibold group-hover:gap-3 transition-all duration-300 ${
                        project.pixelated
                          ? 'font-mono'
                          : `bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`
                      }`}
                      style={project.pixelated ? { color: project.pixelColor } : {}}
                    >
                      {project.link.includes('github.com') ? 'View Code' : project.link.includes('npmjs.com') ? 'View on NPM' : 'Live Demo'}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    {project.github && project.link !== project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ${
                          project.pixelated ? 'font-mono' : ''
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                )}
                {project.packages && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View Repository
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
