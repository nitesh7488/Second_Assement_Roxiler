import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css'; // Importing the CSS file
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import StoreList from './components/StoreList';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stores" element={<StoreList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
