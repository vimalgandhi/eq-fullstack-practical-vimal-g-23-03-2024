import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './app/auth/Sigin';
import SignUp from './app/auth/SignUp';
import { AuthProvider } from './provider/AuthProvider';

const App = () => {
  // const [user, setUser] = React.useState(null);

  // const handleLogin = () => setUser({ id: '1', name: 'robin' });
  // const handleLogout = () => setUser(null);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<SignIn />} exact />
          <Route path="/signup" element={<SignUp />} exact />
        </Routes>
      </AuthProvider>
    </Router>
  );
};


export default App;

