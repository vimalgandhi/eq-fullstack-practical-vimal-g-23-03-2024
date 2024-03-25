import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './app/auth/Sigin';
import SignUp from './app/auth/SignUp';
import Dashboard from './app/dashboard/Dashboard';
import { AuthProvider } from './provider/AuthProvider';


function App() {
  const PrivateRoute = ({ children }) => {
    const tokenLatest = localStorage.getItem("token");
    return tokenLatest ? children : <Navigate to="/login" />;
  };


  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} exact />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                < Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                < Navigate to="/dashboard" />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};


export default App;