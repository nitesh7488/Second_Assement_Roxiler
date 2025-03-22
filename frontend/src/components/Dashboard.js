import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5000/dashboard', { headers: { Authorization: `Bearer ${token}` } })

      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
      alert('Error fetching dashboard data: ' + (error.response ? error.response.data.message : 'Please check your connection and try again.'));

      });
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default Dashboard;
