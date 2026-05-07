import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { rfiService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Forms.css';

const CreateRFI = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    projectName: '',
    subject: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      await rfiService.createRFI(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating RFI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Create New RFI</h1>
        <p className="form-subtitle">Submit a new Request for Information</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="main-form">
          <div className="form-group">
            <label>Project Name *</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
              placeholder="Enter project name"
            />
          </div>

          <div className="form-group">
            <label>Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Enter RFI subject"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Provide detailed description"
              rows="6"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority *</label>
              <select name="priority" value={formData.priority} onChange={handleChange} required>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create RFI'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRFI;
