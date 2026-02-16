'use client';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/lib/utils';

import ContactForm from './ContactForm';

const SwordsIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-sword"
  >
    <path d="M22 2L11 13" />
    <path d="M12 16L9 13" />
    <path d="M21 21L13 13" />
    <path d="M3 3l8 8" />
    <path d="M12 22l4-4" />
    <path d="M2 12l10 10" />
  </svg>
);

const ExchangeIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-arrow-right-left"
  >
    <path d="M8 3 4 7l4 4" />
    <path d="M20 7H4" />
    <path d="M16 21l4-4-4-4" />
    <path d="M4 17h16" />
  </svg>
);
const BoxIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-package-open"
  >
    <path d="M7.82 2.76H20.74a1 1 0 0 1 .84 1.54l-11.4 17.5a1 1 0 0 1-1.68-.01L3.38 4.3a1 1 0 0 1 .84-1.54Z" />
    <path d="m14.92 10 3-4.8" />
    <path d="M6.17 14 3.73 9.87" />
  </svg>
);

const featureList = [
  {
    title: 'Open Case',
    description: 'Access curated, community, and exclusive cases with publicly verified fair odds.',
    icon: BoxIcon,
    color: 'text-red-500',
  },
  {
    title: 'Case Battle',
    description: 'Challenge players 1v1 or in team modes. Winner takes all the loot in a thrilling face-off.',
    icon: SwordsIcon,
    color: 'text-indigo-500',
  },
  {
    title: 'Exchanger',
    description: 'Instantly swap your unwanted skins for better items or site balance. Seamless inventory upgrade.',
    icon: ExchangeIcon,
    color: 'text-red-500',
  },
];
function FeaturesSection() {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <div>
      <section className="py-16" id="features">
        <h2
          className={cn('text-4xl font-bold text-center mb-16 opacity-0', {
            ['animate-stagger delay-0']: inView,
          })}
          ref={ref}
        >
          Everything You Need to <span className="text-red-400">Upgrade Your Inventory</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feature, idx) => (
            <div
              key={feature.title}
              className={cn(
                'group flex flex-col items-center p-6 bg-gray-900 rounded-xl shadow-xl border border-gray-800 transition duration-300 transform hover:scale-[1.03] hover:border-red-600 cursor-pointer hover:shadow-2xl hover:shadow-red-900/40  opacity-0',
                { [`animate-stagger delay-${(idx + 1) * 200}`]: inView },
              )}
            >
              <feature.icon className={`w-10 h-10 mb-4 ${feature.color} transition-colors group-hover:text-white`} />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      <div className={cn('opacity-0', { ['animate-stagger delay-800']: inView })}>
        <ContactForm />
      </div>
    </div>
  );
}

export default FeaturesSection;
