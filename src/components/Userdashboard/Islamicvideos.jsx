import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS.css';

const Islamicvideos = () => {
  const [videos, setVideos] = useState([]);
  const [showAll, setShowAll] = useState(false); // State to manage showing all videos

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/uploadvideo/getVideos'); // Adjust the API endpoint as needed
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        console.error('Failed to fetch videos');
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
    }
  };

  const handleToggleShow = () => {
    setShowAll(!showAll); // Toggle the showAll state
  };

  return (
    <div className="pt-5 container " >
      <h1 className="underline mb-4 mt-2">Islamic Videos</h1>
      <div className="row">
        {(showAll ? videos : videos.slice(0, 8)).map((video) => ( // Show all videos or first 4
          <div key={video._id} className="col-md-3 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <video className="card-img-top" width="100%" height="220" controls>
                <source src={`http://localhost:5000/${video.filePath}`} type="video/mp4" />
              </video>
            </div>
          </div>
        ))}
      </div>
        <p onClick={handleToggleShow} 
        style={{ cursor: 'pointer', color: 'rgb(255,193,7)', fontWeight:'bold', textDecoration: 'underline',textAlign:'center' }}>
          {showAll ? 'Show Less' : 'Show More'}
        </p>
      
    </div>
  );
};

export default Islamicvideos;
