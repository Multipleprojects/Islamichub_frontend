import React, { useState, useEffect } from 'react';
import moment from 'moment-hijri';

const Islamicdates = () => {
  const [islamicDate, setIslamicDate] = useState('');
  const [gregorianDate, setGregorianDate] = useState('');

  useEffect(() => {
    // Get the current Gregorian date
    const currentGregorianDate = moment().format('dddd, MMMM D, YYYY'); // e.g., "Monday, October 9, 2024"
    setGregorianDate(currentGregorianDate);

    // Get the current Islamic date in Hijri format
    const currentIslamicDate = moment().format('iD iMMMM iYYYY'); // e.g., "1 Safar 1446"
    setIslamicDate(currentIslamicDate);
  }, []);

  return (
    <div className='fade-in-image'>
      {islamicDate ? <p><span style={{color: 'rgb(209, 173, 60)'}}>Islamic Date</span>: {islamicDate}</p> : <p>Loading...</p>}
      {gregorianDate ? <p><span style={{color: 'rgb(209, 173, 60)'}}>Gregorian Date</span>: {gregorianDate}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Islamicdates;
