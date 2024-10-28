import React from 'react';
import './CSS.css'; // Import custom CSS file for styling
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'; // Import React Icons

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="text-center text-lg-start bg-body-tertiary text-white" style={{ backgroundColor: 'rgb(8, 124, 128)' }}>
        {/* Section: Social media */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* Left */}
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          {/* Left */}

          {/* Right */}
          <div className="d-flex justify-content-center ">
            <a href="https://www.facebook.com/profile.php?id=61563844558032" className="me-4 text-reset" style={{ fontSize: '1.7rem', marginRight: '30px' }}>
              <FaFacebookF style={{ color: 'white' }} /> {/* Facebook */}
            </a>
            <a href="https://x.com/Mudassirdev92" className="me-4 text-reset" style={{ fontSize: '1.7rem', marginRight: '30px' }}>
              <FaTwitter style={{ color: 'white' }} /> {/* Twitter */}
            </a>
            <a href="https://www.instagram.com/mudassirdeveloper92/" className="me-4 text-reset" style={{ fontSize: '1.7rem', marginRight: '30px' }}>
              <FaInstagram style={{ color: 'white' }} /> {/* Instagram */}
            </a>
            <a href="www.linkedin.com/in/-mern-stack-developer-101344292" className="me-4 text-reset" style={{ fontSize: '1.7rem', marginRight: '30px' }}>
              <FaLinkedin style={{ color: 'white' }} /> {/* LinkedIn */}
            </a>
            <a href="https://github.com/Multipleprojects?tab=repositories" className="me-4 text-reset" style={{ fontSize: '1.7rem', marginRight: '30px' }}>
              <FaGithub style={{ color: 'white' }} /> {/* GitHub */}
            </a>
          </div>
          {/* Right */}
        </section>

        <section>
          <div className="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
              {/* About Us */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4" style={{ color: 'rgb(209, 173, 60)' }}>
                  About Us
                </h6>
                <p>
                  Quran e Noor aims to provide authentic Islamic resources and connect the community through educational content.
                </p>
              </div>

              {/* Islamic Resources */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4" style={{ color: 'rgb(209, 173, 60)' }}>
                  Islamic Resources
                </h6>
                <p><a href="" className="text-reset">Quran Recitations</a></p>
                <p><a href="#!" className="text-reset">Islamic Videos</a></p>
                <p><a href="#!" className="text-reset">Islamic Articles</a></p>
                <p><a href="#!" className="text-reset">Duas & Supplications</a></p>
              </div>

              {/* Services */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4" style={{ color: 'rgb(209, 173, 60)' }}>
                  Services
                </h6>
                <p><a href="https://www.youtube.com/live/CngwZ2EM8Mw?si=KmHKZLNd39rkvWrf" className="text-reset">Makkah Live </a></p>
                <p><a href="#!" className="text-reset">Message of the Day</a></p>
                <p><a href="#!" className="text-reset">Community Events</a></p>
              </div>

              {/* Contact Information */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4" style={{ color: 'rgb(209, 173, 60)' }}>
                  Contact
                </h6>
                <p><i className="fas fa-home me-3"></i> Ghousia Chowk, Rawalpindi</p>
                <p><i className="fas fa-envelope me-3"></i> safi@gmail.com</p>
                <p><i className="fas fa-phone me-3"></i> +92 3317368549</p>
                <p><i className="fas fa-print me-3"></i> +92 3350830723</p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>

        {/* Copyright */}
        <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2024 Quran e Noor. All Rights Reserved.
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </div>
  );
};

export default Footer;
