import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import deerLogo from '../assets/png-tree-deer-logo-icon.png';

function ChatbotInterface({ onLogout }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const samplePrompts = [
    "Founders with experience in Machine Learning",
    "Expertise in Algorithmic trading"
  ];

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    handleSend(prompt);
  };

  const handleSend = async (message = input) => {
    if (message.trim()) {
      const userMessage = { text: message, sender: 'user' };
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
            message: message
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
      height: '100vh', // Changed from fixed pixel value
      width: '100%', // Changed from fixed pixel value
      margin: 0,
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#f5f5f7',
      color: '#1d1d1f',
      overflow: 'hidden',
    },
    header: {
      backgroundColor: '#ffffff',
      padding: windowDimensions.width <= 768 ? '0.5rem' : '1rem',
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
      paddingLeft: windowDimensions.width <= 768 ? '10px' : '20px',
    },
    logo: {
      width: windowDimensions.width <= 768 ? '30px' : '40px',
      height: windowDimensions.width <= 768 ? '30px' : '40px',
      marginRight: '0.5rem',
    },
    headerTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    headerTitle: {
      fontSize: windowDimensions.width <= 768 ? '1.2rem' : '1.5rem',
      fontWeight: '600',
      color: '#1d1d1f',
      margin: '0',
    },
    headerSubtitle: {
      fontSize: windowDimensions.width <= 768 ? '0.7rem' : '0.8rem',
      color: '#86868b',
      margin: '0',
    },
    logoutButton: {
      position: 'absolute',
      top: windowDimensions.width <= 768 ? '0.5rem' : '1rem',
      right: windowDimensions.width <= 768 ? '0.5rem' : '1rem',
      padding: windowDimensions.width <= 768 ? '0.3rem 0.6rem' : '0.4rem 0.8rem',
      fontSize: windowDimensions.width <= 768 ? '0.7rem' : '0.8rem',
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
      padding: windowDimensions.width <= 768 ? '0.5rem' : '1rem',
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
      maxWidth: windowDimensions.width <= 768 ? '85%' : '70%',
      padding: windowDimensions.width <= 768 ? '0.5rem 0.75rem' : '0.75rem 1rem',
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
      padding: windowDimensions.width <= 768 ? '0.5rem' : '1rem',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #d2d2d7',
      position: 'sticky',
      bottom: 0,
    },
    inputContainer: {
      maxWidth: '800px',
      width: '100%',
      margin: '0 auto',
      display: 'flex',
    },
    input: {
      flex: 1,
      padding: windowDimensions.width <= 768 ? '0.5rem' : '0.75rem',
      fontSize: windowDimensions.width <= 768 ? '0.9rem' : '1rem',
      border: '1px solid #d2d2d7',
      borderRadius: '1.5rem',
      marginRight: '0.75rem',
      resize: 'none',
      backgroundColor: '#ffffff',
      color: '#1d1d1f',
      minHeight: windowDimensions.width <= 768 ? '36px' : '40px',
      maxHeight: '100px',
      overflow: 'auto',
    },
    sendButton: {
      padding: windowDimensions.width <= 768 ? '0.5rem' : '0.75rem 1.5rem',
      fontSize: windowDimensions.width <= 768 ? '0.9rem' : '1rem',
      backgroundColor: '#007aff',
      color: 'white',
      border: 'none',
      borderRadius: '1.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      alignSelf: 'flex-end',
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
    samplePromptsContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '10px',
      padding: '10px',
      backgroundColor: '#f0f0f0',
    },
    samplePrompt: {
      padding: '5px 10px',
      backgroundColor: '#e0e0e0',
      borderRadius: '15px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'background-color 0.3s',
    },
  };

  const renderMarkdown = (text) => {
    return (
      <ReactMarkdown
        components={{
          img: ({node, ...props}) => (
            <img {...props} style={styles.markdownImage} alt={props.alt || 'Image'} />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContainer}>
          <img
            src={deerLogo}
            alt="Reindeer Logo"
            style={styles.logo}
          />
          <div style={styles.headerTextContainer}>
            <h1 style={styles.headerTitle}>Reindeer</h1>
            <p style={styles.headerSubtitle}>Your AI assistant to the Antler Cohort UK12</p>
          </div>
        </div>
        <button style={styles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      </div>
      <div style={styles.chatArea}>
        <div style={styles.messageContainer}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(message.sender === 'user' ? styles.userMessage : styles.botMessage),
              }}
            >
              {message.sender === 'user' ? (
                message.text
              ) : (
                <div style={styles.markdownContent}>
                  {renderMarkdown(message.text)}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div style={styles.loadingIndicator}>AI is thinking...</div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div style={styles.samplePromptsContainer}>
        {samplePrompts.map((prompt, index) => (
          <div
            key={index}
            style={styles.samplePrompt}
            onClick={() => handlePromptClick(prompt)}
          >
            {prompt}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <div style={styles.inputContainer}>
          <textarea
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows="1"
          />
          <button style={styles.sendButton} onClick={() => handleSend()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatbotInterface;
