import React, { useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import deerLogo from '../assets/png-tree-deer-logo-icon.png'; // Import the image

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isMobile = useMediaQuery({ maxWidth: 480 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios({
        method: 'post',
        url: 'https://dreamcatcher-webapp-backend.azurewebsites.net/login',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          username,
          password
        })
      });

      console.log('Login response:', response.data);
      onLogin(username);
    } catch (error) {
      console.error('Login error:', error.response || error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      boxSizing: 'border-box',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: isMobile ? '1.5rem' : '2rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    title: {
      margin: 0,
      fontSize: '2rem',
      color: '#1d1d1f',
    },
    subtitle: {
      margin: '0.5rem 0 1rem',
      fontSize: '0.9rem',
      color: '#86868b',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      marginBottom: '1rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: isMobile ? '0.9rem' : '1rem',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: isMobile ? '0.9rem' : '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    error: {
      color: 'red',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
    },
    logo: {
      width: '40px',
      height: '40px',
      marginRight: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.headerContainer}>
          <img
            src={deerLogo}
            alt="Reindeer Logo"
            style={styles.logo}
          />
          <h1 style={styles.title}>Reindeer</h1>
        </div>
        <p style={styles.subtitle}>Your AI assistant to the Antler Cohort UK12</p>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
