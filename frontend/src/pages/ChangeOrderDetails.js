import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { changeOrderService } from '../services/api';
import '../styles/Details.css';

const ChangeOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [co, setCo] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchChangeOrder();
  }, [id]);

  const fetchChangeOrder = async () => {
    try {
      const response = await changeOrderService.getChangeOrderById(id);
      setCo(response.data);
    } catch (err) {
      setError('Error fetching Change Order');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await changeOrderService.addChangeOrderComment(id, { text: newComment });
      setNewComment('');
      fetchChangeOrder();
    } catch (err) {
      setError('Error adding comment');
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await changeOrderService.updateChangeOrderStatus(id, { status: newStatus });
      fetchChangeOrder();
    } catch (err) {
      setError('Error updating status');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!co) return <div className="error-message">Change Order not found</div>;

  return (
    <div className="details-container">
      <div className="details-header">
        <div>
          <h1>{co.coNumber}: {co.title}</h1>
          <p className="breadcrumb">
            <button onClick={() => navigate('/dashboard')} className="link-btn">
              Dashboard
            </button>
            → Change Order Details
          </p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
          Back
        </button>
      </div>

      <div className="details-grid">
        <div className="main-content">
          <div className="card">
            <div className="card-header">
              <h2>Change Order Information</h2>
              <span className={`badge badge-${co.status.toLowerCase()}`}>
                {co.status}
              </span>
            </div>
            <div className="card-body">
              <div className="info-grid">
                <div className="info-item">
                  <strong>CO Number</strong>
                  <p>{co.coNumber}</p>
                </div>
                <div className="info-item">
                  <strong>Project Name</strong>
                  <p>{co.projectName}</p>
                </div>
                <div className="info-item">
                  <strong>Cost Impact</strong>
                  <p className="cost-value">${co.costImpact.toLocaleString()}</p>
                </div>
                <div className="info-item">
                  <strong>Schedule Impact</strong>
                  <p>{co.scheduleImpact}</p>
                </div>
                <div className="info-item">
                  <strong>Submitted By</strong>
                  <p>{co.submittedBy?.name}</p>
                </div>
                <div className="info-item">
                  <strong>Created Date</strong>
                  <p>{new Date(co.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="full-width">
                <strong>Description</strong>
                <p className="description-text">{co.description}</p>
              </div>

              {co.reason && (
                <div className="full-width">
                  <strong>Reason</strong>
                  <p className="description-text">{co.reason}</p>
                </div>
              )}

              {co.approvalNotes && (
                <div className="full-width approval-section">
                  <strong>Approval Notes</strong>
                  <p className="description-text">{co.approvalNotes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Status Update</h2>
            </div>
            <div className="card-body">
              <div className="status-buttons">
                {['Pending', 'Under Review', 'Approved', 'Rejected', 'Implemented'].map((status) => (
                  <button
                    key={status}
                    className={`status-btn ${co.status === status ? 'active' : ''}`}
                    onClick={() => handleStatusChange(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Comments ({co.comments?.length || 0})</h2>
            </div>
            <div className="card-body">
              <div className="comments-list">
                {co.comments && co.comments.length > 0 ? (
                  co.comments.map((comment, idx) => (
                    <div key={idx} className="comment">
                      <div className="comment-header">
                        <strong>{comment.userName}</strong>
                        <small>{new Date(comment.timestamp).toLocaleString()}</small>
                      </div>
                      <p>{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-data">No comments yet</p>
                )}
              </div>

              <form onSubmit={handleAddComment} className="comment-form">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Add Comment
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="card">
            <div className="card-header">
              <h3>History</h3>
              <button
                className="link-btn"
                onClick={() => setShowHistory(!showHistory)}
              >
                {showHistory ? 'Hide' : 'Show'}
              </button>
            </div>
            {showHistory && (
              <div className="card-body history-list">
                {co.history && co.history.length > 0 ? (
                  co.history.map((entry, idx) => (
                    <div key={idx} className="history-entry">
                      <strong>{entry.action}</strong>
                      <p>{entry.notes}</p>
                      <small>{new Date(entry.timestamp).toLocaleString()}</small>
                    </div>
                  ))
                ) : (
                  <p className="no-data">No history</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeOrderDetails;
