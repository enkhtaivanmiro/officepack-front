'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'sonner';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleWaitlistSubmit = (e: any) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatusMessage('Please enter a valid email address.');
      return;
    }
    const formData = new FormData();
    Object.entries({
      email: email,
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }).forEach(([key, value]) => {
      if (value) formData.append(key, `${value || ''}`);
    });
    fetch('https://script.google.com/macros/s/AKfycbzKproGaoAueqnFvU3niOZd44nSEvSjqBPG9RpPYHDcrgHtGB9KYoTvVgwAMeVZOyuqOQ/exec', {
      method: 'POST',
      mode: 'no-cors', // Use "cors" if the script allows it
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
    }).finally(() => {
      toast.success('Амжилттай');
    });
    // Simulation: In a real app, this would send data to a backend.
    setStatusMessage('Thank you for joining the waitlist! We will notify you upon launch.');
    setEmail('');
  };
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto p-5 md:p-10 bg-gray-900 rounded-3xl shadow-2xl border-2 border-red-700/30">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          GET EARLY ACCESS & <span className="text-red-400">EXCLUSIVE BONUSES.</span>
        </h2>
        <p className="text-lg text-gray-400 text-center mb-8">
          Join the Lootella waitlist and be the first to receive special launch codes and exclusive case drops.
        </p>

        <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="flex-grow p-4 text-gray-100 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 transition duration-200"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 text-lg font-bold uppercase tracking-wider text-white bg-red-600 rounded-xl shadow-lg shadow-red-700/50 transition duration-300 transform hover:scale-[1.03] hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-70 sm:w-auto w-full"
          >
            JOIN WAITLIST
          </button>
        </form>

        {statusMessage && (
          <p
            className={`mt-6 text-center font-medium ${statusMessage.includes('Thank you') ? 'text-green-400' : 'text-red-400'}`}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </section>
  );
}

export default ContactForm;
