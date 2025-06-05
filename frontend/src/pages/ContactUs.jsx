import  { useState } from 'react';
import MainLayout from '../Layout/MainLayout';
import {contactUs} from '../utils/api';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactUs(formData);
      setSuccess('Message sent successfully!');
      setError('');
      setFormData({ name: '', email: '', message: '' });
    } catch(err) {
      setError('Something went wrong. Try again later.');
      setSuccess('');
    }
  };

  return (
    <MainLayout>
        <div className="container mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
    </div>
    </MainLayout>
  );
};

export default ContactUs;
