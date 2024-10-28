import React from 'react';

const Makkah = () => {
  return (
    <div className="container mt-4 ">
      <h1 className="text-center mb-4" style={{ color: 'rgb(209,173,60)' }}>Live Stream from Makkah</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe 
              className="embed-responsive-item w-100" 
              src="https://www.youtube.com/live/v2YqMC5GXyw?si=1S2tDkMG42ReHmf-" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
              title="Makkah Live Stream"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makkah;
