import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

function AboutUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you for contacting us!');
    setFormData({ name: '', email: '', message: '' });
  };

  const students = [
    {
      name: 'Revanth P',
      github: 'https://github.com/revanth1234',
      desc: `Hi, I'm Revanth P, a passionate student from NIT Warangal.
I built APIs to fetch cafes and transport facilities near tourist places using Leaflet and Geoapify,
and displayed them on a real-time map. I contributed to the full-stack development of hotel-related pages
with AI-based assistance for enhanced user interaction. I also implemented role-based access, a booking system,
and co-developed Stripe payment integration with complete frontend-backend connectivity.`
    },
    {
      name: 'Vignesh',
      github: 'https://github.com/vignesh4321',
      desc: `Hey, I'm Vignesh, a tech enthusiast from NIT Warangal.
I built dual authentication using Google OAuth and JWT, developed an AI chatbot, and implemented LRU caching
to improve performance. I worked on displaying tourist places with interactive maps using Geoapify,
added Pixabay API integration for image enhancements, built the booking system, and co-developed
Stripe payment and full-stack connectivity.`
    }
  ];

  return (
    <div className="px-6 py-10 sm:px-10 md:px-20 font-sans bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">About Us</h1>

      <section className="mb-16 space-y-10">
        <h2 className="text-2xl font-semibold text-gray-700">Meet the Students</h2>
        {students.map((student, i) => (
          <div key={i} className="text-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold">{student.name}</h3>
              <a
                href={student.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black"
              >
                <FaGithub size={20} />
              </a>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed">{student.desc}</p>
          </div>
        ))}
      </section>

      <hr className="border-t border-gray-300 my-10" />

      <section className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-200"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your Name"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Your Email"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            value={formData.message}
            placeholder="Your Message"
            rows={4}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default AboutUs;
