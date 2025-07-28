"use client"

export default function ExperienceWindow() {
  const experiences = [
    {
      title: "Director of Operations",
      company: "Vertex Innovate",
      location: "Chennai",
      period: "Feb 2025 – Present",
      description: [
        "Spearheaded operations and strategy",
        "Launched superapp platforms for connection and mentorship",
        "Secured strategic partnerships through strong negotiation skills",
      ],
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "User Experience Designer",
      company: "SixthSense Legal",
      location: "Chennai",
      period: "Jan 2025 – Present",
      description: [
        "Designed official firm website with high focus on UX",
        "Applied data analysis & legal research to streamline case access",
      ],
      color: "from-green-500 to-blue-600",
    },
    {
      title: "Robotics Engineer",
      company: "ATOM Robotics",
      location: "Chennai",
      period: "Jul 2024 – Present",
      description: [
        "Built autonomous agriculture drones with ROS2 & C++ on Jetson Nano",
        "Used Kalman filters for sensor fusion and PyTorch for vision",
      ],
      color: "from-orange-500 to-red-600",
    },
  ]

  return (
    <div className="text-white scroll-container mobile-window-content" style={{ maxHeight: "calc(80vh - 32px)" }}>
      <h2 className="text-2xl font-bold mb-6 text-center text-white tracking-tight">Professional Experience</h2>

      <div className="scroll-container space-y-6" style={{ maxHeight: "320px" }}>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-white/8 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/12 hover:border-blue-400/20 transition-all duration-300"
            style={{
              animation: `slideInLeft 0.6s ease-out ${index * 0.2}s both`,
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-white tracking-tight">{exp.title}</h3>
                <p className="text-blue-300 font-semibold">{exp.company}</p>
                <p className="text-sm text-gray-400">{exp.location}</p>
              </div>
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full border border-white/10 text-gray-300 font-medium">
                {exp.period}
              </span>
            </div>

            {/* Description */}
            <ul className="space-y-2 mb-4">
              {exp.description.map((item, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start">
                  <span className="text-blue-400 mr-3 mt-1 text-xs">▸</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Gradient Bar */}
            <div className="h-1 rounded-full overflow-hidden bg-white/5">
              <div
                className={`h-full bg-gradient-to-r ${exp.color} rounded-full`}
                style={{
                  animation: `expandWidth 1s ease-out ${index * 0.3 + 0.5}s both`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
