import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateRFI from './pages/CreateRFI';
import RFIDetails from './pages/RFIDetails';
import CreateChangeOrder from './pages/CreateChangeOrder';
import ChangeOrderDetails from './pages/ChangeOrderDetails';
import PrivateRoute from './components/PrivateRoute';
import './styles/App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/rfi/new"
            element={
              <PrivateRoute>
                <CreateRFI />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/rfi/:id"
            element={
              <PrivateRoute>
                <RFIDetails />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/change-order/new"
            element={
              <PrivateRoute>
                <CreateChangeOrder />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/change-order/:id"
            element={
              <PrivateRoute>
                <ChangeOrderDetails />
              </PrivateRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
