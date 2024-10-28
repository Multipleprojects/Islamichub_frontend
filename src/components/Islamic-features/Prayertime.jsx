import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import '../../pages/CSS.css'
const Prayertime = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const { coords } = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${coords.latitude}&longitude=${coords.longitude}&method=2`
        );
        const data = await response.json();

        if (data.code === 200) {
          const times = data.data.timings;
          const filteredTimes = {
            Fajr: times.Fajr,
            Dhuhr: times.Dhuhr,
            Asr: times.Asr,
            Maghrib: times.Maghrib,
            Isha: times.Isha,
          };
          setPrayerTimes(filteredTimes);
        } else {
          console.error('Error fetching prayer times:', data.status);
        }
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <div className='fade-in-image'>
      <h3 style={{color:'rgb(209,173,60)'}}className='font'>Prayer Time</h3>
      {prayerTimes ? (
        <ul style={{ padding: 0, listStyleType: 'none' }}>
          {Object.keys(prayerTimes).map((time) => (
            <li 
              key={time} 
              style={{ 
                color: 'white', 
                borderBottom: '1px solid #ccc', // Bottom border
                display: 'flex', // Flexbox for alignment
                justifyContent: 'space-between' // Space between items
              }}
     className='p-1 p-lg-2'
     >
              <span>{time}</span>
              <span>{moment(prayerTimes[time], 'HH:mm:ss').format('h:mm A')}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Prayertime;
