import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS.css';
import Islamicdates from '../components/Islamic-features/Islamicdates';
import Prayertime from '../components/Islamic-features/Prayertime';
import { GiHamburgerMenu } from "react-icons/gi";
import axios from 'axios';
import img from '../assets/logooo.jpg';
import { ImCross } from "react-icons/im";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false); // State to manage hamburger menu visibility
  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const getmessage = await axios.get("http://localhost:5000/message/get");
        setMessageData(getmessage.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessage();
  }, []);
  const handleMenuClick = () => {
    if (window.innerWidth < 992) { // Only close on screens smaller than large (992px)
      setShowMenu(false);
    }
  };
  return (
    <header>
      {/* Header Image with Overlay for Text */}
      <div className="header-image" style={{ overflow: 'hidden' }}>
        <div className="overlay d-flex flex-column p-2 flex-lg-row justify-content-lg-around">
          <div className='pb-4 order-1'>
            <Islamicdates />
            <div className='d-none d-lg-block'>
              <Prayertime />
            </div>
          </div>
          <div className="order-0 message-text fade-in-image">
            <h4>
              <span style={{ color: 'rgb(209, 173, 60)' }}>Message of the Day</span>
            </h4>
            <div>
              {
                Array.isArray(messageData) && messageData.length > 0 ? (
                  messageData.map((data, index) => (
                    <p key={index}>{data.message}</p>
                  ))
                ) : (
                  <p>No messages available</p>
                )
              }
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: 'rgb(8, 124, 128)' }}>
        <div className="container-fluid">
          {/* Logo - Quran e Noor */}
          <a className="navbar-brand text-white d-lg-flex" href="#">
            <img src={img} height='50px' width='150px' className="img-bold" alt="Logo" />
          </a>

          {/* Hamburger Menu for small screens */}
          <div className="d-lg-none text-white">
            {/* Toggle the menu on click */}
            {showMenu ? (
              <ImCross size={20} onClick={() => setShowMenu(false)} /> // Close icon
            ) : (
              <GiHamburgerMenu size={30} onClick={() => setShowMenu(true)} /> // Hamburger icon
            )}
          </div>

          {/* Collapsible menu */}
          <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
            {/* Center Navigation Items */}
            <ul className="navbar-nav mx-auto text-center">
              <li className="nav-item" onClick={handleMenuClick} >
                <NavLink className="nav-link text-white" to='/' >Home</NavLink>
              </li>
              <li className="nav-item" onClick={handleMenuClick}>
                <a className="nav-link text-white" href="#quran">Quran</a>
              </li>
              <li className="nav-item" onClick={handleMenuClick} >
                <a className="nav-link text-white" href="#articles">Articles</a>
              </li>
              <li className="nav-item" onClick={handleMenuClick}> 
                <a className="nav-link text-white" href="#videos">Videos</a>
              </li>
              <li className="nav-item" onClick={handleMenuClick}>
                <a href="https://www.youtube.com/live/CngwZ2EM8Mw?si=KmHKZLNd39rkvWrf" className="nav-link text-white">
                  <div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
                    <img src='/live.png' height='30px' width='40px' alt="Live"
                      style={{ position: 'absolute', left: '45%', top: '100%', transform: 'translateY(-50%)', zIndex: 0 }} />
                    <span>Makkah</span>
                  </div>
                </a>
              </li>
            </ul>

            {/* Right Side - Login Button */}
            <div className="mt-lg-0 mt-3 text-center">
              <button className="btn btn-warning rounded-pill" onClick={handleMenuClick}>
                <NavLink className="nav-link text-white" to='/admin/login'>Login</NavLink>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
