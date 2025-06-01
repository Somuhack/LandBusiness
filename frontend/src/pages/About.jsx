import React from 'react';
import "../assets/css/style.css";
import MainLayout from '../Layout/MainLayout';
import Profile from "../assets/img/profile.jpg"
const AboutUs = () => {
  const cards = [
    {
      title: "Our Mission",
      image: Profile,
      description: "We aim to deliver high-quality services with a customer-first mindset."
    },
    {
      title: "Our Vision",
      image: Profile,
      description: "Empowering businesses with innovative digital solutions."
    },
      {
        title: "Our Team",
        image: Profile,
        description: "A group of passionate professionals dedicated to your success."
      }
  ];

  return (
    <MainLayout>
      <div className="about-us-banner">
        <div className="banner-overlay">
          <div className="banner-text">
            <h1>Who We Are</h1>
            <p>We’re a dedicated team committed to providing impactful digital solutions tailored to our clients’ goals.</p>
            <p>With years of experience, innovative tools, and a passion for excellence, we transform ideas into reality.</p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
      </div>

      <div className="card-slider">
        {cards.map((card, index) => (
          <div className="info-card" key={index}>
            <img src={card.image} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default AboutUs;
