import React, { useState } from 'react';

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

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>About Us</h1>
      <div style={{ marginBottom: '30px' }}>
        <h2>Meet the Students</h2>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div>
            <h3>Revanth Kumar</h3>
            <p>
              Revanth is a passionate full-stack web developer with a keen interest in MERN stack,
              system design, and open-source contributions.
            </p>
          </div>
          <div>
            <h3>Rahul Mehta</h3>
            <p>
              Rahul specializes in frontend development, UI/UX design, and enjoys working with React,
              TailwindCSS, and TypeScript to build beautiful interfaces.
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div style={{ marginTop: '30px' }}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Your Email"
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            value={formData.message}
            placeholder="Your Message"
            onChange={handleChange}
            rows={4}
            required
          ></textarea>
          <button type="submit" style={{ background: '#007BFF', color: 'white', padding: '8px', border: 'none' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AboutUs;
