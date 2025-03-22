import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StoreList() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: '', address: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:3000/stores', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        alert('Error fetching stores: ' + (error.response ? error.response.data.message : 'Please try again.'));
      });
  }, [navigate]);

  const handleRatingSubmit = async (storeId, rating) => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/ratings', { store_id: storeId, rating }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        return axios.get('http://localhost:3000/stores', { headers: { Authorization: `Bearer ${token}` } });
      })
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        alert('Error submitting rating: ' + (error.response ? error.response.data.message : 'Please try again.'));
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const containerStyle = { padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' };
  const inputStyle = { padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' };

  const logoutStyle = { padding: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };

  return (
    <div style={containerStyle}>
      <h1>Store List</h1>
      <input type="text" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} placeholder="Search by Name" style={inputStyle} />
      <input type="text" value={filters.address} onChange={(e) => setFilters({ ...filters, address: e.target.value })} placeholder="Search by Address" style={inputStyle} />
      <ul>
        {stores.filter((s) => s.name.includes(filters.name) && s.address.includes(filters.address)).map((store) => (
          <li key={store.id}>
            {store.name} - {store.address} - Rating: {store.rating || 'N/A'} - Your Rating: {store.userRating || 'Not Rated'}
            <select onChange={(e) => handleRatingSubmit(store.id, parseInt(e.target.value))} defaultValue="">
              <option value="" disabled>Rate</option>
              {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </li>
        ))}
      </ul>
      <button style={logoutStyle} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default StoreList;