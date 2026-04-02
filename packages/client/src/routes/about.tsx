import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8 max-w-6xl mx-auto bg-white shadow-xl rounded-2xl border border-gray-100">
      {/* Left Section: Two stacked boxes */}
      <div className="flex flex-col gap-6 md:w-1/2 lg:w-2/5">
        {/* Top Box - Image Placeholder */}
        <div className="w-full h-48 md:h-64 bg-linear-to-br from-blue-400 to-indigo-500 rounded-xl shadow-md overflow-hidden">
          <img
            src="https://placehold.co/600x400/E0F2F7/2C3E50/png?text=Product+Showcase"
            alt="Product Showcase Image"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Bottom Box - Image Placeholder */}
        <div className="w-full h-48 md:h-64 bg-linear-to-br from-green-400 to-teal-500 rounded-xl shadow-md overflow-hidden">
          <img
            src="https://placehold.co/600x400/E8F5E9/2E7D32/png?text=Feature+Highlight"
            alt="Feature Highlight Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Section: Related Text Content */}
      <div className="flex flex-col gap-4 md:w-1/2 lg:w-3/5 p-4 md:p-0">
        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Unlock Your Potential with Our Advanced Platform
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Discover a suite of powerful tools designed to streamline your operations and boost productivity. Our intuitive interface ensures a seamless experience, allowing you to focus on what truly matters.
        </p>
        <p className="text-gray-600 text-base leading-relaxed">
          From real-time analytics to collaborative workspaces, every feature is crafted to empower your team and drive innovation. Experience the difference of a truly integrated solution.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-base space-y-2 mt-2">
          <li>Comprehensive Data Insights</li>
          <li>Flexible Customization Options</li>
          <li>Robust Security Measures</li>
          <li>Dedicated Customer Support</li>
        </ul>
        <p className="text-gray-600 text-sm mt-4">
          Join thousands of satisfied users who are transforming their workflows and achieving remarkable results with our platform.
        </p>
      </div>
    </div>
  );
}


