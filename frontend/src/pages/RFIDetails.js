import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rfiService } from '../services/api';
import '../styles/Details.css';

const RFIDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rfi, setRfi] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchRFI();
  }, [id]);

  const fetchRFI = async () => {
    try {
      const response = await rfiService.getRFIById(id);
      setRfi(response.data);
    } catch (err) {
      setError('Error fetching RFI');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await rfiService.addRFIComment(id, { text: newComment });
      setNewComment('');
      fetchRFI();
    } catch (err) {
      setError('Error adding comment');
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await rfiService.updateRFIStatus(id, { status: newStatus });
      fetchRFI();
    } catch (err) {
      setError('Error updating status');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!rfi) return <div className="error-message">RFI not found</div>;

  return (
    <div className="details-container">
      <div className="details-header">
        <div>
          <h1>{rfi.rfiNumber}: {rfi.subject}</h1>
          <p className="breadcrumb">
            <button onClick={() => navigate('/dashboard')} className="link-btn">
              Dashboard
            </button>
            → RFI Details
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
              <h2>RFI Information</h2>
              <span className={`badge badge-${rfi.status.toLowerCase()}`}>
                {rfi.status}
              </span>
            </div>
            <div className="card-body">
              <div className="info-grid">
                <div className="info-item">
                  <strong>RFI Number</strong>
                  <p>{rfi.rfiNumber}</p>
                </div>
                <div className="info-item">
                  <strong>Project Name</strong>
                  <p>{rfi.projectName}</p>
                </div>
                <div className="info-item">
                  <strong>Priority</strong>
                  <p>{rfi.priority}</p>
                </div>
                <div className="info-item">
                  <strong>Status</strong>
                  <p>{rfi.status}</p>
                </div>
                <div className="info-item">
                  <strong>Created By</strong>
                  <p>{rfi.submittedBy?.name}</p>
                </div>
                <div className="info-item">
                  <strong>Created Date</strong>
                  <p>{new Date(rfi.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="full-width">
                <strong>Description</strong>
                <p className="description-text">{rfi.description}</p>
              </div>

              {rfi.answer && (
                <div className="full-width answer-section">
                  <strong>Answer</strong>
                  <p className="answer-text">{rfi.answer}</p>
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
                {['Submitted', 'Under Review', 'Answered', 'Closed'].map((status) => (
                  <button
                    key={status}
                    className={`status-btn ${rfi.status === status ? 'active' : ''}`}
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
              <h2>Comments ({rfi.comments?.length || 0})</h2>
            </div>
            <div className="card-body">
              <div className="comments-list">
                {rfi.comments && rfi.comments.length > 0 ? (
                  rfi.comments.map((comment, idx) => (
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
                {rfi.history && rfi.history.length > 0 ? (
                  rfi.history.map((entry, idx) => (
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

export default RFIDetails;
