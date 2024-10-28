import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast, Toaster } from 'react-hot-toast';
import './CSS.css'
const UserCard = () => {
  const [usersData, setUsersData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState({ email: '', name: '', password: '' });

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user');
      setUsersData(response.data);
    } catch (error) {
      toast.error('Error fetching users data:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditData({ email: user.email, name: user.name, password: user.password });
    setShowEditModal(true);
  };
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/user/${userId}`);
      setUsersData(usersData.filter((user) => user._id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Error deleting user:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/user/${selectedUser._id}`, editData);
      setUsersData(usersData.map((user) =>
        user._id === selectedUser._id ? response.data.user : user
      ));
      setShowEditModal(false);
      toast.success('User updated successfully');
    } catch (error) {
      toast.error('Error updating user:', error);
    }
  };
  const firstUser = usersData[0] || {};
  return (
    <div className="pt-4">
      <h1 style={{color:'rgb(8,124,128)'}} className='text-center sizee'>
      Total Website Visitors: {firstUser.Visitors || 'No Data'}
      </h1>
      <h1 style={{color:'rgb(8,124,128)',textDecoration:'underline' }} className='size'>User's Detail</h1>
      <div className="row userscrollbar ">
        {usersData.length > 0 ? (
          usersData.map((user) => (
            <div className="col-md-3 mb-4" key={user._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">User Information</h5>
                  <p className="card-text"><strong>Name:</strong> {user.name}</p>
                  <p className="card-text"><strong>Email:</strong> {user.email}</p>
                  <p className="card-text"><strong>Password:</strong> {user.password}</p>
                  <Button
                    style={{ backgroundColor: 'rgb(8,124,128)',border:'none' }}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No user data available.</p>
        )}
      </div>

      <Modal show={showEditModal} className='p-4' onHide={() => setShowEditModal(false)} centered>
        <Modal.Header>
          <Modal.Title style={{color:'rgb(8,124,128)'}}>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={editData.password}
                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: 'rgb(8,124,128)' , border:'none'}}
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserCard;
