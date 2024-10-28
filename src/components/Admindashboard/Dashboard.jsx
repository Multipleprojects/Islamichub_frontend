import React, { useState } from 'react';
import Admin_image from '../../assets/admin.png';
import { useNavigate } from 'react-router-dom';
import './CSS.css';  // Import your custom CSS
import Prayertime from '../Islamic-features/Prayertime';
import Islamicdates from '../Islamic-features/Islamicdates'; // Import the Islamicdates component
import Qibla from '../Islamic-features/Qibla';
import Tasbeeh from '../Islamic-features/Tasbeeh'; // Import the TasbeehModal component
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaClock, FaCalendarAlt, FaPray, FaStar } from 'react-icons/fa'; // Import icons
import tasbih from '../../assets/tasbih.png'
import qibla from '../../assets/islam.png'

const Dashboard = () => {
  const navigate = useNavigate();
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [showIslamicDateModal, setShowIslamicDateModal] = useState(false);
  const [showTasbeehModal, setShowTasbeehModal] = useState(false);
  const [showQiblaModal, setShowQiblaModal] = useState(false); // Add state for Qibla modal
  return (
    <div className="dashboard-container mb-5 mt-5">
     
      <div className="button-container">
        <button 
          className="dashboard-button" 
          onClick={() => navigate('/messageoftheday')}
        >
          Create Message Of The Day
        </button>
        <button 
          className="dashboard-button" 
          onClick={() => navigate('/upload/video')}
        >
          Upload  Videos
        </button>
        <button 
          className="dashboard-button" 
          onClick={() => navigate('/upload/article')}
        >
          Create  Articles
        </button>
        <button 
          className="dashboard-button" 
          onClick={() => navigate('/admin/detail')}
        >
          User/Admin Details
        </button>
      </div>

      {/* Modal for Prayer Times */}
      <Modal show={showPrayerModal} onHide={() => setShowPrayerModal(false)} centered>
        <Modal.Header>
          <Modal.Title style={{color:'rgb(8,124,128)'}}>Prayer Times</Modal.Title>
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
      <Modal show={showIslamicDateModal} onHide={() => setShowIslamicDateModal(false)} centered>
        <Modal.Header>
          <Modal.Title style={{color:'rgb(8,124,128)'}}>Islamic Date</Modal.Title>
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
export default Dashboard;
