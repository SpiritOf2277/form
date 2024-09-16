import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserForm = ({ userId }) => {
  const [userData, setUserData] = useState({
    login: '',
    password: '',
    role: 'user',
    gender: 'male',
    status: true
  });

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/users/${userId}`, userData)
      .then(response => {
        console.log('User updated successfully:', response.data);
        alert('User data updated successfully');
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      
      <label>
        Login:
        <input
          type="text"
          name="login"
          value={userData.login}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Role:
        <select name="role" value={userData.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
      </label>
      <br />

      <label>
        Gender:
        <input
          type="checkbox"
          name="gender"
          value="male"
          checked={userData.gender === 'male'}
          onChange={() => setUserData({ ...userData, gender: 'male' })}
        />
        Male
        <input
          type="checkbox"
          name="gender"
          value="female"
          checked={userData.gender === 'female'}
          onChange={() => setUserData({ ...userData, gender: 'female' })}
        />
        Female
      </label>
      <br />

      <label>
        Status:
        <input
          type="checkbox"
          name="status"
          checked={userData.status}
          onChange={handleChange}
        />
        {userData.status ? 'Enabled' : 'Disabled'}
      </label>
      <br />

      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUserForm;
