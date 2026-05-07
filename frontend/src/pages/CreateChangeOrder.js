import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeOrderService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Forms.css';

const CreateChangeOrder = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    projectName: '',
    title: '',
    description: '',
    costImpact: 0,
    scheduleImpact: 'No Impact',
    delayDays: 0,
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await changeOrderService.createChangeOrder(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating Change Order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Create New Change Order</h1>
        <p className="form-subtitle">Submit a new Change Order for project modifications</p>

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
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter change order title"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Provide detailed description of the change"
              rows="6"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cost Impact ($) *</label>
              <input
                type="number"
                name="costImpact"
                value={formData.costImpact}
                onChange={handleChange}
                required
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Schedule Impact *</label>
              <select name="scheduleImpact" value={formData.scheduleImpact} onChange={handleChange} required>
                <option value="No Impact">No Impact</option>
                <option value="Accelerate">Accelerate</option>
                <option value="Delay">Delay</option>
              </select>
            </div>
          </div>

          {formData.scheduleImpact === 'Delay' && (
            <div className="form-group">
              <label>Delay Duration (Days)</label>
              <input
                type="number"
                name="delayDays"
                value={formData.delayDays}
                onChange={handleChange}
                placeholder="Number of days"
              />
            </div>
          )}

          <div className="form-group">
            <label>Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Explain the reason for this change order"
              rows="4"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Change Order'}
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

export default CreateChangeOrder;
