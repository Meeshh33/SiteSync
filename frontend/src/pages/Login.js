import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'Architect',
    companyName: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await authService.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await authService.register(formData);
      }

      const { token, user } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const roles = ['Project Manager', 'Architect', 'Contractor', 'Client Representative', 'Site Supervisor'];

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>Construction RFI & Change Order Management</h1>
          <p className="subtitle">Digital Solution for Project Control</p>
        </div>

        <div className="auth-form-container">
          <div className="form-toggle">
            <button
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            {!isLogin && (
              <>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                  />
                </div>

                <div className="form-group">
                  <label>Role *</label>
                  <select name="role" value={formData.role} onChange={handleChange} required>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
            </button>
          </form>
        </div>

        <div className="auth-footer">
          <p>© 2026 Construction Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
