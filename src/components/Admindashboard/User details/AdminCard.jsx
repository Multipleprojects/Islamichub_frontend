import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { toast, Toaster } from 'react-hot-toast';
const AdminCard = () => {
  const [admin, setAdmin] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin');
      setAdmin(response.data);
      setEmail(response.data.email);
      setPassword(response.data.password);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/admin/${admin._id}`, { email, password });
      setAdmin(response.data.admin);
      setIsEditing(false);
      toast.success('Admin updated successfully');
    } catch (error) {
      toast.error('Error updating admin:', error);
    }
  };
  return (
    <div className="">
      <h1 style={{color:'rgb(8,124,128)',textDecoration:'underline'}} className='size'>Admin Detail</h1>
      {admin && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Admin Details</h5>
            {!isEditing ? (
              <>
                <p className="card-text">Email: {admin.email}</p>
                <p className="card-text">Password: {admin.password}</p>
                <button className="btn custom-btn text-white" style={{ backgroundColor: 'rgb(8, 124, 128)' }} onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="btn custom-btn text-white" style={{ backgroundColor: 'rgb(8, 124, 128)' }} onClick={handleUpdate}>
                  Update
                </button>
                <button className="btn btn-secondary ml-2" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminCard;
