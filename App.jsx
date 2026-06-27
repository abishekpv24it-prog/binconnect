import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { getUserData } from './services/database';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import LoadingScreen from './components/Layout/LoadingScreen';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import AdminSignUp from './components/Auth/AdminSignUp';
import RoleSelection from './components/Auth/RoleSelection';
import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ReportForm from './components/Reports/ReportForm';
import MyReports from './components/Reports/MyReports';
import Leaderboard from './components/Leaderboard/Leaderboard';
import ReportManagement from './components/Admin/ReportManagement';
import HeatMap from './components/Admin/HeatMap';
import './App.css';

const Home = () => (
  <div className="home-container">
    <div className="home-hero">
      <h1>Welcome to BinConnect</h1>
      <p>Help keep our campus clean by reporting overflowing garbage bins</p>
      <div className="hero-buttons">
        <Link to="/get-started" className="btn-primary">Get Started</Link>
        <Link to="/login" className="btn-secondary">Login</Link>
      </div>
    </div>
    <div className="features">
      <h2>How It Works</h2>
      <div className="features-grid">
        <div className="feature-card">
          <h3>📸 Report</h3>
          <p>Snap a photo of an overflowing bin and submit location details</p>
        </div>
        <div className="feature-card">
          <h3>🔔 Track</h3>
          <p>Get real-time updates on your report status via WhatsApp</p>
        </div>
        <div className="feature-card">
          <h3>🏆 Earn</h3>
          <p>Collect points and climb the leaderboard for recognition</p>
        </div>
      </div>
    </div>
  </div>
);


function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const userData = await getUserData(authUser.uid);
        setIsAdmin(userData?.role === 'admin');
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
            <Route path="/get-started" element={user ? <Navigate to="/dashboard" /> : <RoleSelection />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUp />} />
            <Route path="/admin-signup" element={user ? <Navigate to="/dashboard" /> : <AdminSignUp />} />
            <Route path="/dashboard" element={
              user ? (isAdmin ? <AdminDashboard /> : <UserDashboard />) : <Navigate to="/login" />
            } />
            <Route path="/report" element={user && !isAdmin ? <ReportForm /> : <Navigate to="/dashboard" />} />
            <Route path="/my-reports" element={user && !isAdmin ? <MyReports /> : <Navigate to="/dashboard" />} />
            <Route path="/leaderboard" element={user ? <Leaderboard /> : <Navigate to="/login" />} />
            <Route path="/admin/reports" element={user && isAdmin ? <ReportManagement /> : <Navigate to="/dashboard" />} />
            <Route path="/admin/heatmap" element={user && isAdmin ? <HeatMap /> : <Navigate to="/dashboard" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
