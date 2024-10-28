import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import './CSS.css';
import toast, { Toaster } from 'react-hot-toast';

const VideoUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Validate file type (only MP4 and MKV allowed)
    const validFileTypes = ['video/mp4', 'video/x-matroska'];
    if (!validFileTypes.includes(selectedFile.type)) {
      toast.error('Only MP4 and MKV formats are supported.');
      return;
    }

    // Validate file size (e.g., 1GB max)
    const maxSize = 1024 * 1024 * 1024; // 1GB
    if (selectedFile.size > maxSize) {
      toast.error('File size exceeds the 1GB limit.');
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a video file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);

      // Upload the file first
      const uploadResponse = await axios.post('http://localhost:5000/uploadvideo/uploadfiles', formData);
      if (!uploadResponse.data.success) {
        toast.error('File upload failed. Please try again.');
        return;
      }

      // Check if the video title already exists
      const titleCheckResponse = await axios.get(`http://localhost:5000/uploadvideo/getVideos`);
      const existingTitles = titleCheckResponse.data.videos.map(video => video.title.toLowerCase());
      if (existingTitles.includes(file.name.toLowerCase())) {
        toast.error('A video with this title already exists.');
        return;
      }

      // If the title is unique, save the video metadata
      const videoData = {
        filePath: uploadResponse.data.filePath,
        title: file.name,
      };
      const videoResponse = await axios.post('http://localhost:5000/uploadvideo/uploadVideo', videoData);

      toast.success('Video uploaded successfully!');
      onUploadSuccess(videoResponse.data.video);
      setFile(null);
    } catch (error) {
      toast.error('An error occurred during the upload.');
      console.error('Upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="video-upload-container " style={{borderRadius:'1rem'}}>
     
      <div className="upload-box">
        <FaCloudUploadAlt size={80} color="#6c757d" />
        <p>Drag and drop video file</p>
        <p>or</p>
        <input type="file" onChange={handleFileChange} accept="video/*" style={{ display: 'none' }} id="file-input" />
        <label htmlFor="file-input" className="upload-button">
          Browse
        </label>
      </div>
      <button onClick={handleUpload} disabled={uploading || !file} className="upload-confirm-button">
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default VideoUpload;
