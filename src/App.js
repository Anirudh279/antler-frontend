import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import ChatbotInterface from './components/ChatbotInterface';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <ChatbotInterface onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
