'use client'

export default function Education() {
  return (
    <section id="education" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
          Education
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-green-200 dark:border-green-900 hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src="/telhai-logo.svg"
                  alt="Tel-Hai College Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#567856' }}>
                  Bachelor&apos;s Degree in Computer Science
                </h3>
                <p className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#6a9669' }}>
                  Tel-Hai College, Israel
                </p>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium">
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
