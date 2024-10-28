import React from 'react';
import './CSS.css'; // Import the new CSS file

const WatchVideo = ({ videos, onDelete }) => {
  return (
    <div className='scrollable'>
      <h2 className='mt-3 text-center' style={{color:'rgb(8,124,128)',textDecoration:'underline'}}>Uploaded Videos</h2>
      {videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video._id} className="video-item">
              <video width="320" height="200" controls>
                <source src={`http://localhost:5000/${video.filePath}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="video-info">
                <strong>{video.title}</strong>
                <button className="delete-button w-25" onClick={() => onDelete(video._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchVideo;
