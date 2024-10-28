import React, { useState } from 'react';
import signupimage from '../../assets/signup.png';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Password validation
    if (formData.password.length > 6) {
      toast.error('Password should not exceed 6 characters');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/user', formData);
      toast.success(response.data.message); // Display success message
navigate('/login');
    } catch (error) {
      if (error.response || error.response.data || error.response.data.message) {
        toast.error(error.response.data.message); // Display error message
      } else {
        toast.error('An error occurred'); // Fallback error message
      }
    }
  };
  
  return (
    <div>
      <Toaster />
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div style={{ borderRadius: '25px' }}>
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-6 d-none d-md-block order-2 order-md-1">
                    <img
                      src={signupimage}
                      className="img-fluid"
                      alt="signup-image"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'cover',
                        borderRadius: '25px',
                      }}
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center order-1 order-md-2">
                    <div style={{ width: '100%' }}>
                      <p
                        className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                        style={{ color: 'rgb(8,124,128)' }}
                      >
                        Sign up
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="name"
                              value={formData.name}
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
                              required
                            />
                            <label className="form-label" htmlFor="form3Example1c">
                              Your Name
                            </label>
                          </div>
                        </div>
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
                              required
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
                              required
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
                              width: '100%',
                            }}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                      <div className="text-center mt-4">
                        <p className="text-muted">
                          Already have an account? <Link to="/login" style={{ color: 'rgb(8,124,128)' }}>Login here</Link>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
