import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Vehicles from './pages/Vehicles';
import VehicleDetail from './pages/VehicleDetail';
import AddVehicle from './pages/AddVehicle';
import MyListings from './pages/MyListings';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import ScrollToTop from './pages/ScrollToTop';
import ForgotPassword from './pages/ForgotPassword';
import Contact from './pages/Contact';
function AppContent() {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/register'];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/vehicles" element={
              <ProtectedRoute>
                <Vehicles />
              </ProtectedRoute>
            }
          />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-vehicle"
            element={
              <ProtectedRoute sellerOnly={true}>
                <AddVehicle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-listings"
            element={
              <ProtectedRoute sellerOnly={true}>
                <MyListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        {!shouldHideFooter && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;