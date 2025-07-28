"use client"

import Image from "next/image"

export default function ResumeWindow() {
  const handleDownload = () => {
    // Download the actual resume image
    const link = document.createElement("a")
    link.href = "/resume-andrew-sundaradhas.png"
    link.download = "Andrew_Sundaradhas_Resume.png"
    link.click()
  }

  return (
    <div className="text-white scroll-container mobile-window-content" style={{ maxHeight: "calc(80vh - 32px)" }}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Resume</h2>
        <p className="text-gray-300">Andrew Sundaradhas - Robotics Engineer & Operations Director</p>
      </div>

      {/* Resume Preview */}
      <div className="bg-white rounded-lg p-4 mb-6 text-black min-h-[400px] max-h-[500px] overflow-hidden">
        <div className="w-full h-full flex items-center justify-center relative">
          <Image
            src="/resume-andrew-sundaradhas.png"
            alt="Andrew Sundaradhas Resume"
            width={400}
            height={450}
            className="max-w-full max-h-full object-contain"
            style={{ maxHeight: "450px" }}
          />
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center space-x-2"
        >
          <span>📄</span>
          <span>Download Resume</span>
        </button>
      </div>

      {/* Resume Summary */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="text-center space-y-2">
          <h3 className="font-bold text-lg text-white">Quick Summary</h3>
          <p className="text-sm text-gray-300">
            Drone engineer with expertise in C++, data structures, and high-flying negotiations. Building smart drones,
            strategic deals, and adding humor to every mission.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {["C++", "PyTorch", "ROS2", "Robotics", "Data Structures", "Negotiation"].map((skill) => (
              <span
                key={skill}
                className="bg-white/10 text-white text-xs px-2 py-1 rounded-full border border-white/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
