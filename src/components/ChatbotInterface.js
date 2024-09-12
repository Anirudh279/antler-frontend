import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import deerLogo from '../assets/png-tree-deer-logo-icon.png';

function ChatbotInterface({ onLogout }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await axios({
          method: 'post',
          url: 'https://w3u2jlhyj6.execute-api.us-east-1.amazonaws.com/prod/antler-bot',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            message: input
          })
        });

        const responseData = JSON.parse(response.data.body);
        const botMessage = { text: responseData.message, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#f5f5f7',
      color: '#1d1d1f',
      overflow: 'hidden',
    },
    header: {
      backgroundColor: '#ffffff',
      padding: '1rem',
      borderBottom: '1px solid #d2d2d7',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      textAlign: 'left',
      maxWidth: '800px',
      margin: '0 auto',
      paddingLeft: '20px',
    },
    logo: {
      width: '40px',
      height: '40px',
      marginRight: '0.5rem',
    },
    headerTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    headerTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1d1d1f',
      margin: '0',
    },
    headerSubtitle: {
      fontSize: '0.8rem',
      color: '#86868b',
      margin: '0',
    },
    logoutButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      padding: '0.4rem 0.8rem',
      fontSize: '0.8rem',
      backgroundColor: '#007aff',
      color: 'white',
      border: 'none',
      borderRadius: '1.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    chatArea: {
      flex: 1,
      overflowY: 'auto',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
    },
    messageContainer: {
      maxWidth: '800px',
      width: '100%',
      margin: '0 auto',
    },
    message: {
      maxWidth: '70%',
      padding: '0.75rem 1rem',
      borderRadius: '1rem',
      marginBottom: '0.75rem',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#007aff',
      color: 'white',
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#f5f5f7',
      color: '#1d1d1f',
    },
    inputArea: {
      display: 'flex',
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #d2d2d7',
    },
    inputContainer: {
      maxWidth: '800px',
      width: '100%',
      margin: '0 auto',
      display: 'flex',
    },
    input: {
      flex: 1,
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #d2d2d7',
      borderRadius: '1.5rem',
      marginRight: '0.75rem',
      resize: 'none',
      backgroundColor: '#ffffff',
      color: '#1d1d1f',
    },
    sendButton: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      backgroundColor: '#007aff',
      color: 'white',
      border: 'none',
      borderRadius: '1.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    loadingIndicator: {
      alignSelf: 'flex-start',
      color: '#86868b',
      marginBottom: '0.75rem',
      fontStyle: 'italic',
    },
    markdownContent: {
      width: '100%',
      overflowX: 'auto',
    },
    markdownImage: {
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '200px',
      objectFit: 'contain',
      borderRadius: '0.5rem',
    },
  };

  const mobileStyles = {
    container: {
      ...styles.container,
      maxWidth: '100%',
    },
    header: {
      ...styles.header,
      padding: '0.5rem',
    },
    chatArea: {
      ...styles.chatArea,
      padding: '0.5rem',
    },
    message: {
      ...styles.message,
      maxWidth: '85%',
    },
    inputArea: {
      ...styles.inputArea,
      padding: '0.5rem',
    },
    input: {
      ...styles.input,
      fontSize: '0.9rem',
    },
    sendButton: {
      ...styles.sendButton,
      padding: '0.4rem 0.8rem',
      fontSize: '0.9rem',
    },
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentStyles = isMobile ? { ...styles, ...mobileStyles } : styles;

  const renderMarkdown = (text) => {
    return (
      <ReactMarkdown
        components={{
          img: ({node, ...props}) => (
            <img {...props} style={currentStyles.markdownImage} alt={props.alt || 'Image'} />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    );
  };

  return (
    <div style={currentStyles.container}>
      <div style={currentStyles.header}>
        <div style={currentStyles.headerContainer}>
          <img
            src={deerLogo}
            alt="Reindeer Logo"
            style={currentStyles.logo}
          />
          <div style={currentStyles.headerTextContainer}>
            <h1 style={currentStyles.headerTitle}>Reindeer</h1>
            <p style={currentStyles.headerSubtitle}>Your AI assistant to the Antler Cohort UK12</p>
          </div>
        </div>
        <button style={currentStyles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      </div>
      <div style={currentStyles.chatArea}>
        <div style={currentStyles.messageContainer}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                ...currentStyles.message,
                ...(message.sender === 'user' ? currentStyles.userMessage : currentStyles.botMessage),
              }}
            >
              {message.sender === 'user' ? (
                message.text
              ) : (
                <div style={currentStyles.markdownContent}>
                  {renderMarkdown(message.text)}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div style={currentStyles.loadingIndicator}>AI is thinking...</div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div style={currentStyles.inputArea}>
        <div style={currentStyles.inputContainer}>
          <textarea
            style={currentStyles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows="1"
          />
          <button style={currentStyles.sendButton} onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatbotInterface;
