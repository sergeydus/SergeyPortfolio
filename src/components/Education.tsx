export default function Education() {
  return (
    <section id="education" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400">
          Education
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="group bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105">
            <div className="flex items-start gap-6">
              <div className="text-6xl">🎓</div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 mb-3">
                  Bachelor's Degree in Computer Science
                </h3>
                <p className="text-xl text-blue-600 dark:text-blue-400 mb-2 font-semibold">
                  Tel-Hai College, Israel
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  October 2015 - July 2019
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
