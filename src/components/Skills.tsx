const skills = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'MySQL', 'Java', 'Kotlin'], icon: '💻' },
  { category: 'Frontend', items: ['React', 'React Native', 'Next.js', 'Vue 2/3', 'Angular 21+', 'Nuxt', 'TailwindCSS', 'Material UI'], icon: '🎨' },
  { category: 'Backend', items: ['Node.js', 'NestJS', 'Express.js', 'TypeORM', 'REST APIs'], icon: '⚙️' },
  { category: 'Database', items: ['MySQL', 'MongoDB', 'SQLite', 'TypeORM'], icon: '🗄️' },
  { category: 'State Management', items: ['Mobx', 'Pinia', 'Redux'], icon: '🔄' },
  { category: 'Tools & Practices', items: ['GitHub Copilot', 'Cursor', 'Git', 'Agile/Jira', 'Figma', 'Code Review', 'PR Management'], icon: '🛠️' },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
          Skills & Technologies
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16 text-lg">Technologies I work with to build exceptional products</p>
        
        <div className="max-w-7xl mx-auto space-y-6">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{skill.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {skill.category}
                  </h3>
                  <div className="ml-auto text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {skill.items.length} {skill.items.length === 1 ? 'skill' : 'skills'}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-blue-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-md transition-all duration-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
