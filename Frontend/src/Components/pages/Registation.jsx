import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:3000/api/register', {
        name: name,
        email: email,
        password: password,
        userType: userType // Ensure the field name matches the server-side validation
      });

      // Handle successful registration
      console.log('Registration successful!', response.data);
    } catch (error) {
      // Handle registration error
      console.error('Registration failed:', error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User Type:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option>Select User Type</option>
            <option value="author">author</option>
            <option value="reader">reader</option>
          </select>
        </div>
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default RegistrationForm;
