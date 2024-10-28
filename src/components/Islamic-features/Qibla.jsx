import React, { useEffect, useState } from 'react';
import './Qibla.css'; // Import the CSS file for styling

const Qibla = () => {
  const [rotation, setRotation] = useState(0); // Compass rotation state
  const [qiblaAngle, setQiblaAngle] = useState(null); // Qibla direction angle

  // Function to calculate the Qibla direction based on user's location
  const calculateQiblaDirection = (latitude, longitude) => {
    const qiblaLat = 21.4225; // Latitude of Mecca
    const qiblaLong = 39.8262; // Longitude of Mecca

    const phiK = (qiblaLat * Math.PI) / 180.0;
    const phiL = (latitude * Math.PI) / 180.0;
    const deltaLong = ((qiblaLong - longitude) * Math.PI) / 180.0;

    const y = Math.sin(deltaLong);
    const x = Math.cos(phiL) * Math.tan(phiK) - Math.sin(phiL) * Math.cos(deltaLong);

    let qiblaDirection = (Math.atan2(y, x) * 180.0) / Math.PI;
    if (qiblaDirection < 0) qiblaDirection += 360;

    setQiblaAngle(qiblaDirection);
    setRotation(-qiblaDirection); // Rotate the compass so Qibla points upwards
  };

  // Fetch user's geolocation and calculate Qibla direction
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          calculateQiblaDirection(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  return (
    <div className="compass-container">
      <div className="compass" style={{ transform: `rotate(${rotation}deg)` }}>
        <div className="needle"></div>
        {qiblaAngle && (
          <div className="qibla-indicator" style={{ transform: `rotate(${qiblaAngle}deg)` }}>
            Qibla
          </div>
        )}
        
        <div className="direction west">W</div>
        <div className="direction east">E</div>
        <div className="direction south">S</div>
       
        <div className="direction north">N</div>
      </div>
    </div>
  );
};

export default Qibla;
