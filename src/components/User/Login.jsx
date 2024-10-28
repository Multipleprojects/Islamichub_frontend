import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import signinimage from '../../assets/signin.webp';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
const Login = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Handles input changes for the form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Opens the Forgot Password Modal
  const openForgotPasswordModal = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.email === '' || formData.password === '') {
      toast.error("Please enter your email and password.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/login', formData);
      // Handle successful login if needed
    } catch (error) {
      if (error.response && error.response.data.message === 'Password incorrect') {
        setUserId(error.response.data.id); // Retrieve user ID from the error response
        setIsModalOpen(true); // Open modal
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  // Closes the Forgot Password Modal
  const closeForgotPasswordModal = () => {
    setIsModalOpen(false);
    setNewPassword(''); // Clear the new password field
  };

  // Inside the Login component
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/user/login', formData);
    const { message, token } = response.data;
    // Decode the token to get the role
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    if (message.includes('login successful')) {
      localStorage.setItem('authToken', token);
      toast.success(message);

      if (userRole === 'admin') {
        navigate('/admin/dashboard'); // Redirect to admin dashboard
      }
    }
  } catch (error) {
    if (error.response) {
      if (error.response.data.message === 'Password incorrect') {
        toast.error('Password is incorrect');
        return;
      }
      toast.error(error.response.data.message || 'An unexpected error occurred.');
    } else {
      toast.error('An unexpected error occurred.');
    }
  }
};
  // Handles updating the password
  const handlePasswordUpdate = async () => {
    if (newPassword === '') {
      toast.error('Please enter a new password.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/user/updatepassword/${userId}`, { password: newPassword });
      toast.success('Password updated successfully.');
      closeForgotPasswordModal(); // Close the modal after success
    } catch (error) {
      toast.error('Failed to update password.');
    }
  };
  return (
    <section className="vh-100">
      <Toaster />
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="">
              <div className="card-body p-md-5">
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-6 d-none d-md-block order-2 order-md-1">
                    <img
                      src={signinimage}
                      className="img-fluid"
                      alt="login"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '90%',
                        objectFit: 'cover',
                        borderRadius: '25px',
                        padding: '10px'
                      }}
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center order-1 order-md-2">
                    <div style={{ width: '100%' }}>
                      <p
                        className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                        style={{ color: 'rgb(8,124,128)' }}
                      >
                        Login
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              style={{
                                borderColor: 'rgb(8,124,128)',
                                outline: 'none',
                                width: '100%',
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = 'black';
                                e.target.style.boxShadow = 'none';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = 'rgb(8,124,128)';
                              }}
               
                             />
                            <label className="form-label" htmlFor="form3Example3c">
                              Your Email
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              style={{
                                borderColor: 'rgb(8,124,128)',
                                outline: 'none',
                                width: '100%',
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = 'black';
                                e.target.style.boxShadow = 'none';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = 'rgb(8,124,128)';
                              }}
               
               />
                            <label className="form-label" htmlFor="form3Example4c">
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-lg text-white"
                            style={{
                              backgroundColor: 'rgb(8,124,128)',
                              width: '100%'
                            }}
                          >
                            Login
                          </button>
                        </div>
                      </form>
                      <div className="text-center">
                        <p>
                          Don't have an account?{' '}
                          <Link to="/signup" style={{ color: 'rgb(8,124,128)', textDecoration: 'underline' }}>
                            Sign Up
                          </Link>
                        </p>
                        <p>
                          <a
                            onClick={openForgotPasswordModal}
                            style={{ color: 'rgb(8,124,128)', textDecoration: 'underline', cursor: 'pointer' }}
                          >
                            Forgot Password?
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && userId && (
          <div className="modal p-4" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" style={{color:'rgb(8,124,128)'}}>Update Password</h5>
                </div>
                <div className="modal-body">
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                      borderColor: 'rgb(8,124,128)',
                      outline: 'none',
                      width: '100%',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'black';
                      e.target.style.boxShadow = 'none';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgb(8,124,128)';
                    }}
     
                  />
                    <label className="form-label" htmlFor="form3Example4c">
                        Enter New Pasword
                            </label>
                        
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn  btn btn-secondary" onClick={closeForgotPasswordModal}>
                    Cancel
                  </button>
                  <button type="button" 
                                         className="btn  text-white"
                            style={{
                              backgroundColor: 'rgb(8,124,128)',
                            }}
      onClick={handlePasswordUpdate}>
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
