import React, { useState } from 'react';
import Admin_image from '../../assets/user.png';
import { useNavigate } from 'react-router-dom';
import '../Admindashboard/CSS.css';  // Import your custom CSS
import Prayertime from '../Islamic-features/Prayertime';
import Islamicdates from '../Islamic-features/Islamicdates'; // Import the Islamicdates component
import Qibla from '../Islamic-features/Qibla';
import Tasbeeh from '../Islamic-features/Tasbeeh'; // Import the TasbeehModal component
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaClock, FaCalendarAlt, FaPray, FaStar } from 'react-icons/fa'; // Import icons
import tasbih from '../../assets/tasbih.png';
import qibla from '../../assets/islam.png';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [showIslamicDateModal, setShowIslamicDateModal] = useState(false);
  const [showTasbeehModal, setShowTasbeehModal] = useState(false);
  const [showQiblaModal, setShowQiblaModal] = useState(false); // Add state for Qibla modal
  return (
    <div className="dashboard-container">
      <div className="pt-4 feature" style={{ cursor: 'pointer' }}>
        <div onClick={() => setShowPrayerModal(true)} className="icon-item">
          <FaPray size={30} color='rgb(8,124,128)' />
          <p>Prayer</p>
        </div>
        <div onClick={() => setShowIslamicDateModal(true)} style={{ cursor: 'pointer' }} className="icon-item">
          <FaCalendarAlt size={30} color='rgb(8,124,128)' />
          <p>Date</p>
        </div>
        <div onClick={() => setShowTasbeehModal(true)} className="icon-item" style={{ cursor: 'pointer' }}>
        <img 
  src={tasbih} 
  height='30px' 
  width='40px' 
  style={{ 
    fontWeight:'bolder'
  }} 
/>

          <p className='text-center'>Tasbih</p>
        </div>
        <div onClick={() => setShowQiblaModal(true)} className="icon-item" style={{ cursor: 'pointer' }}> {/* Update to open Qibla modal */}
          <img 
            src={qibla} 
            height='30px' 
            width='30px' 
            style={{ 
              filter: 'invert(24%) sepia(63%) saturate(1725%) hue-rotate(140deg) brightness(89%) contrast(87%)' 
            }} 
          />
          <p>Qibla</p>
        </div>
      </div>
      <div className="button-container">
        <button 
          className="dashboard-button"  
          onClick={() => navigate('/qurandashboard')}
        >
          Quran Dashboard
        </button>
        <button 
          className="dashboard-button mt-2" 
          onClick={() => navigate('/islamicvideos')}
        >
          Islamic Videos
        </button>
        <button 
          className="dashboard-button mt-2" 
          onClick={() => navigate('/userarticle')}
        >
          Islamic Articles
        </button>
        <button 
          className="dashboard-button mt-2" 
          onClick={() => navigate('/logout')}
        >
          Logout
        </button>
      </div>

      {/* Modal for Prayer Times */}
      <Modal show={showPrayerModal} className='p-4' onHide={() => setShowPrayerModal(false)} centered>
        <Modal.Header>
          <Modal.Title style={{ color: 'rgb(8,124,128)' }}>Prayer Times</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Prayertime />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrayerModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Islamic Date */}
      <Modal show={showIslamicDateModal} className='p-4' onHide={() => setShowIslamicDateModal(false)} centered>
        <Modal.Header>
          <Modal.Title style={{ color: 'rgb(8,124,128)' }}>Islamic Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Islamicdates />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowIslamicDateModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Tasbeeh */}
      <Tasbeeh show={showTasbeehModal} handleClose={() => setShowTasbeehModal(false)} />

      {/* Modal for Qibla */}
      <Modal show={showQiblaModal} className='p-4' onHide={() => setShowQiblaModal(false)} centered>
        <Modal.Header>
          <Modal.Title style={{ color: 'rgb(8,124,128)' }}>Qibla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Qibla />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQiblaModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserDashboard;
