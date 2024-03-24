import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './app/auth/Sigin';
import SignUp from './app/auth/SignUp';
import Dashboard from './app/dashboard/Dashboard';
import { AuthProvider } from './provider/AuthProvider';

const App = () => {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<SignIn />} exact />
          <Route path="/signup" element={<SignUp />} exact />
          <Route path="/dashboard" element={<Dashboard />} exact />
          {/* <ProtectedRoute path="/dashboard" element={Dashboard} exact /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};


export default App;