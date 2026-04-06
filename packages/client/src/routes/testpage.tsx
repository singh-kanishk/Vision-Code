import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/testpage')({
  component: About,
})

function About() {
    return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
        {/* Top Section: Header/Title */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-semibold text-blue-800">
            Welcome to Our Application
          </h1>
          <p className="text-blue-700 text-sm mt-1">
            A brief overview of the main section.
          </p>
        </div>

        {/* Middle Section: Two-column layout */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Left Column: Stacked content blocks */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800">Feature Highlight One</h3>
              <p className="text-gray-600 text-sm mt-1">
                Discover the innovative solutions we offer to streamline your workflow and boost productivity.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800">Feature Highlight Two</h3>
              <p className="text-gray-600 text-sm mt-1">
                Our platform is designed with user experience in mind, ensuring ease of use for everyone.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800">Feature Highlight Three</h3>
              <p className="text-gray-600 text-sm mt-1">
                Experience robust security measures protecting your data at every step.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800">Feature Highlight Four</h3>
              <p className="text-gray-600 text-sm mt-1">
                Get real-time analytics and insights to make informed decisions faster.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800">Feature Highlight Five</h3>
              <p className="text-gray-600 text-sm mt-1">
                Seamless integration with your existing tools and services.
              </p>
            </div>
          </div>

          {/* Right Column: Image Placeholder */}
          <div className="flex-1 bg-gradient-to-br from-purple-200 to-indigo-300 rounded-lg border border-purple-300 flex items-center justify-center p-6 min-h-[200px] md:min-h-full">
            <img
              src="https://placehold.co/600x400/8b5cf6/ffffff?text=Main+Visual"
              alt="Placeholder for main visual content"
              className="w-full h-auto object-cover rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Bottom Section: Footer/Call to Action */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800 text-sm">
            Ready to get started? Explore our features or contact support for more information.
          </p>
        </div>
      </div>
    </div>
  );
}

