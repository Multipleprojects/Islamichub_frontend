// VideoApp Component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoUpload from './VideoUpload';
import WatchVideo from './WatchVideo';

const VideoApp = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/uploadvideo/getVideos');
      setVideos(response.data.videos);
    } catch (error) {
      console.error('Failed to fetch videos', error);
    }
  };

  const handleUploadSuccess = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/uploadvideo/deleteVideo/${id}`);
      setVideos(videos.filter((video) => video._id !== id));
    } catch (error) {
      console.error('Failed to delete video', error);
    }
  };

  return (
    <div className='containerr'>
    <div>
      <VideoUpload onUploadSuccess={handleUploadSuccess} />
      </div>
      <WatchVideo videos={videos} onDelete={handleDelete} />
    </div>
  );
};

export default VideoApp;