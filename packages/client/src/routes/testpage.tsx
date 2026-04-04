import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/testpage')({
  component: About,
})

function About() {
    return (
    <div className="min-h-screen bg-gray-50 p-8 sm:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Features</h1>
        <p className="text-xl text-gray-600 mb-10">Manage your core functionalities in one place.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeatureCard
            icon={<Zap className="w-5 h-5" />}
            title="Performance Analytics"
            description="Track key metrics, identify bottlenecks, and optimize your system efficiency with real-time data visualization."
            onClick={() => console.log('Analytics clicked')}
          />
          <FeatureCard
            icon={<User className="w-5 h-5" />}
            title="User Management"
            description="Onboard, manage permissions, and control access for all your team members securely through granular roles."
            onClick={() => console.log('User Management clicked')}
          />
          <FeatureCard
            icon={<Settings className="w-5 h-5" />}
            title="System Settings"
            description="Customize the entire platform experience, from branding to integration endpoints, to match your business needs."
            onClick={() => console.log('Settings clicked')}
          />
          <FeatureCard
            icon={<Zap className="w-5 h-5" />}
            title="Billing & Subscriptions"
            description="View invoices, manage payment methods, and upgrade your plan seamlessly without any downtime."
            onClick={() => console.log('Billing clicked')}
          />
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { Zap, User, Settings, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, onClick }) => (
  <div
    className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full flex-shrink-0 mt-1">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    <button className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-150">
      Learn More
      <ArrowRight className="w-4 h-4 ml-1" />
    </button>
  </div>
);


