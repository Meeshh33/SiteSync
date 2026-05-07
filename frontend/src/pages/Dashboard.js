import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { rfiService, changeOrderService } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalRFIs: 0,
    totalChangeOrders: 0,
    pendingRFIs: 0,
    pendingCOs: 0,
  });
  const [rfis, setRfis] = useState([]);
  const [changeOrders, setChangeOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [rfiRes, coRes] = await Promise.all([
        rfiService.getAllRFIs(),
        changeOrderService.getAllChangeOrders(),
      ]);

      setRfis(rfiRes.data);
      setChangeOrders(coRes.data);

      setStats({
        totalRFIs: rfiRes.data.length,
        totalChangeOrders: coRes.data.length,
        pendingRFIs: rfiRes.data.filter((r) => r.status === 'Submitted' || r.status === 'Under Review').length,
        pendingCOs: coRes.data.filter((c) => c.status === 'Pending' || c.status === 'Under Review').length,
      });
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Construction RFI & Change Order Management</h1>
          <p>Welcome, {user?.name} ({user?.role})</p>
        </div>
        <div className="header-right">
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`nav-btn ${activeTab === 'rfis' ? 'active' : ''}`}
          onClick={() => setActiveTab('rfis')}
        >
          📝 RFIs
        </button>
        <button
          className={`nav-btn ${activeTab === 'change-orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('change-orders')}
        >
          ✏️ Change Orders
        </button>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.totalRFIs}</div>
                <div className="stat-label">Total RFIs</div>
              </div>
              <div className="stat-card pending">
                <div className="stat-value">{stats.pendingRFIs}</div>
                <div className="stat-label">Pending RFIs</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.totalChangeOrders}</div>
                <div className="stat-label">Total Change Orders</div>
              </div>
              <div className="stat-card pending">
                <div className="stat-value">{stats.pendingCOs}</div>
                <div className="stat-label">Pending Change Orders</div>
              </div>
            </div>

            <div className="quick-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/rfi/new')}
              >
                + Create New RFI
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/change-order/new')}
              >
                + Create Change Order
              </button>
            </div>

            <div className="recent-section">
              <h3>Recent RFIs</h3>
              {rfis.slice(0, 5).length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>RFI #</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rfis.slice(0, 5).map((rfi) => (
                      <tr key={rfi._id}>
                        <td>{rfi.rfiNumber}</td>
                        <td>{rfi.subject}</td>
                        <td>
                          <span className={`badge badge-${rfi.status.toLowerCase()}`}>
                            {rfi.status}
                          </span>
                        </td>
                        <td>{rfi.priority}</td>
                        <td>{new Date(rfi.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-data">No RFIs yet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'rfis' && (
          <div className="rfis-section">
            <div className="section-header">
              <h2>Request for Information (RFI)</h2>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/rfi/new')}
              >
                + New RFI
              </button>
            </div>

            {rfis.length > 0 ? (
              <div className="rfis-list">
                {rfis.map((rfi) => (
                  <div key={rfi._id} className="card rfi-card">
                    <div className="card-header">
                      <h3>{rfi.rfiNumber}: {rfi.subject}</h3>
                      <span className={`badge badge-${rfi.status.toLowerCase()}`}>
                        {rfi.status}
                      </span>
                    </div>
                    <div className="card-body">
                      <p><strong>Project:</strong> {rfi.projectName}</p>
                      <p><strong>Priority:</strong> {rfi.priority}</p>
                      <p><strong>Description:</strong> {rfi.description.substring(0, 100)}...</p>
                    </div>
                    <div className="card-footer">
                      <small>Created: {new Date(rfi.createdAt).toLocaleDateString()}</small>
                      <button
                        className="btn btn-small"
                        onClick={() => navigate(`/rfi/${rfi._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No RFIs found</p>
            )}
          </div>
        )}

        {activeTab === 'change-orders' && (
          <div className="change-orders-section">
            <div className="section-header">
              <h2>Change Orders</h2>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/change-order/new')}
              >
                + New Change Order
              </button>
            </div>

            {changeOrders.length > 0 ? (
              <div className="cos-list">
                {changeOrders.map((co) => (
                  <div key={co._id} className="card co-card">
                    <div className="card-header">
                      <h3>{co.coNumber}: {co.title}</h3>
                      <span className={`badge badge-${co.status.toLowerCase()}`}>
                        {co.status}
                      </span>
                    </div>
                    <div className="card-body">
                      <p><strong>Project:</strong> {co.projectName}</p>
                      <p><strong>Cost Impact:</strong> ${co.costImpact.toLocaleString()}</p>
                      <p><strong>Schedule Impact:</strong> {co.scheduleImpact}</p>
                    </div>
                    <div className="card-footer">
                      <small>Created: {new Date(co.createdAt).toLocaleDateString()}</small>
                      <button
                        className="btn btn-small"
                        onClick={() => navigate(`/change-order/${co._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No Change Orders found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
