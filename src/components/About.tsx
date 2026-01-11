export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
          About Me
        </h2>
        <div className="max-w-4xl mx-auto backdrop-blur-lg bg-white/50 dark:bg-gray-800/50 p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Full-stack developer with 6+ years of experience building high-performance web and mobile applications. 
            Skilled in modern frontend frameworks (React, Vue, Next.js, Angular) and backend development with Node.js and NestJS.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Focused on clean, maintainable code and scalable architecture. Experienced in mentoring junior developers 
            and delivering user-centric solutions in agile teams.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Proficient in using AI tools like GitHub Copilot and Cursor to speed up development, improve code quality, 
            and streamline workflow.
          </p>
        </div>
      </div>
    </section>
  )
}
