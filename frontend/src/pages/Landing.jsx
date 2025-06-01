import MainLayout from "../Layout/MainLayout";
import { useState, useEffect } from "react";
import LandImage from "../assets/img/land.jpg";
import LandImage2 from "../assets/img/hero2.jpg";
import LandImage3 from "../assets/img/hero1.jpg";
import '../assets/css/Landing.css';

const cards = [
  { title: "Secure Property Deals", desc: "All transactions are safeguarded with verified legal documents and complete buyer protection." },
  { title: "Trusted Sellers", desc: "Only verified and reputable landowners can list properties on our platform." },
  { title: "Easy Application", desc: "Submit your interest with a single click and get notified instantly." },
 
];

const animatedPhrases = [
  "Discover Verified Land Deals with Ease",
  "Buy and Sell Land Safely",
  "Connect with Trusted Sellers"
];

const Landing = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % animatedPhrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="hero-section text-center text-white d-flex align-items-center justify-content-center">
        <div>
          <div className="hero-text-wrapper position-relative d-inline-block">
            <span className="hero-text gradient-text">{animatedPhrases[currentPhrase]}</span>
          </div>
          <p className="lead animated-text">Transparent • Secure • Fast</p>
        </div>
      </section>

      {/* Info + Image Section */}
      <section className="py-5 info-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="mb-3 text-primary">Why Choose Us?</h2>
              <p className="mb-4">We make it easier to connect land buyers and sellers with trust, speed, and transparency.
                <br/>We make it easier to connect land buyers and sellers ,
                <br/>We make it easier to connect land.

              </p>
              <button className="btn btn-warning">Explore Listings</button>
            </div>
            <div className="col-md-6">
              <img src={LandImage} alt="Land" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-success display-5 fw-bold">Our Core Features</h2>
          <div className="row justify-content-center g-4">
            {cards.map((card, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-md-6 col-lg-4">
                <div className="card h-100 shadow-lg border-0">
                  <div className="card-body p-4 bg-info text-white rounded">
                    <h4 className="card-title fw-bold mb-3">{card.title}</h4>
                    <p className="card-text fs-6">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      <section className="py-5 bg-dark text-white">
  <div className="container">
    <h2 className="text-center mb-4">Customer Testimonials</h2>
    <div className="row">
      <div className="col-md-6 text-center mb-4">
        <img src={LandImage2} alt="Happy Buyer" className="mb-3 rounded-circle" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
        <blockquote className="blockquote">
          <p>"This platform helped me find genuine land sellers in days. Highly recommended!"</p>
          <footer className="blockquote-footer text-white">- A Happy Buyer</footer>
        </blockquote>
      </div>
      <div className="col-md-6 text-center mb-4">
        <img src={LandImage3} alt="Trusted Seller" className="mb-3 rounded-circle" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
        <blockquote className="blockquote">
          <p>"Smooth and transparent transactions. It’s my go-to platform for property deals."</p>
          <footer className="blockquote-footer text-white">- Trusted Seller</footer>
        </blockquote>
      </div>
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section className="py-5 bg-white contact-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <h2 className="mb-3 text-danger">Let's Get In Touch</h2>
              <p>Have questions? We’d love to hear from you. Fill out the form and our team will respond shortly.</p>
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                    rows={4}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Landing;
