import { createFileRoute } from '@tanstack/react-router'
import { Square, Minus, Maximize, X } from 'lucide-react';
export const Route = createFileRoute('/testpage')({
  component: About,
})

function About() {
   return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
        {/* Window Header */}
        <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200 rounded-t-xl">
          <div className="flex items-center gap-2">
            {/* Close button */}
            <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition-colors" />
            {/* Minimize button */}
            <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 transition-colors" />
            {/* Maximize button */}
            <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition-colors" />
          </div>
          <span className="text-sm font-medium text-gray-700">Application Window</span>
          <div className="flex items-center gap-2">
            {/* Placeholder for other window controls if needed, or just empty for symmetry */}
            <div className="w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center text-gray-500">
              <Minus className="w-3 h-3" />
            </div>
            <div className="w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center text-gray-500">
              <Maximize className="w-3 h-3" />
            </div>
            <div className="w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center text-gray-500">
              <X className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row flex-1 min-h-[400px]">
          {/* Left Column - Form-like inputs */}
          <div className="flex flex-col p-6 gap-4 md:w-2/3 border-b md:border-b-0 md:border-r border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">User Information</h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <textarea
              placeholder="Your Message or Description"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            ></textarea>
            <button className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Submit
            </button>
          </div>

          {/* Right Column - Details and Image/Ad */}
          <div className="flex flex-col p-6 gap-6 md:w-1/3 bg-gray-50">
            {/* Top Section - Details/Text Area */}
            <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Additional Details</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                This section provides supplementary information or a summary related to the main content. It can display dynamic data, user preferences, or contextual help.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-3">
                <li>Feature A: Enabled</li>
                <li>Feature B: Active</li>
                <li>Status: Online</li>
              </ul>
            </div>

            {/* Bottom Section - Image/Ad Placeholder */}
            <div className="h-48 w-full bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white text-center text-lg font-bold shadow-md overflow-hidden">
              <img
                src="https://placehold.co/400x200/60a5fa/ffffff?text=Promotional+Content"
                alt="Promotional Content"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar - Status/Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 rounded-b-xl flex items-center justify-between text-sm text-gray-600">
          <span>Status: All systems operational.</span>
          <span>Version 1.0.0</span>
        </div>
      </div>
    </div>
  );
}

