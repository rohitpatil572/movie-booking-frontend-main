import React from 'react';
import '../styles/AboutUs.css';

export default function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
      </div>
      <div className="about-content">
        <p>
          Welcome to <strong>Movie Booking App</strong>, your one-stop platform for booking movie tickets with ease. We aim to provide a seamless experience for booking tickets for movies across various genres.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to make your movie-going experience enjoyable and convenient. We provide offline payment options, ensuring a hassle-free process. 
        </p>
        <p>
          Remember, you must arrive at the theater <strong>at least 10 minutes before the showtime</strong>. Otherwise, your tickets may be resold.
        </p>
        <h2>Our Theaters</h2>
        <p>
          All our theaters are located at <strong>Rohit's Theater Park, Mumbai Andheri East.</strong>, offering the best movie experience with premium facilities. Each theater is uniquely designed to suit different cinematic themes:
        </p>
        <ul>
          <li>
            <strong>Rohit's Hollywood Center</strong> - Sector 22
          </li>
          <li>
            <strong>Rohit's Bollywood Center</strong> - Sector 23
          </li>
          <li>
            <strong>Rohit's Marathi Center</strong> - Sector 24
          </li>
          <li>
            <strong>Rohit's Action Center</strong> - Sector 25
          </li>
          <li>
            <strong>Rohit's Family Cinema</strong> - Sector 26
          </li>
        </ul>
        <p>
          We own and manage these five theaters, each offering <strong>3-4 movie shows daily</strong>. Enjoy a wide variety of movies at your convenience.
        </p>
        <h2>Contact Us</h2>
        <p>
          Have questions? Reach out to us anytime:
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:rohitpatil572002@gmail.com">rohitpatil572002@gmail.com</a><br />
          <strong>Mobile:</strong> 9322409277
        </p>
      </div>
    </div>
  );
}
