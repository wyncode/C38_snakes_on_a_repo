import React, { useState, useEffect } from 'react';
import '../colors.css';
import './chat.css';
import socketIo from '../utils/socket-io';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from '@material-ui/core';

const Chat = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socketIo.on('receive message', (data) => {
      // console.log('receive message', data);
      addMessage(data);
    });
  }, [chats]);

  const addMessage = (msg) => {
    setChats(chats.concat({ author: msg.author, message: msg.message }));
  };

  const sendMessage = (event) => {
    event.preventDefault();
    socketIo.emit('send message', { author: username, message: message });
    setMessage('');
  };

  return (
    <div id="chat-container">
      <Card elevation={3} className="gradient-border chat-display" id="about">
        <CardContent className="card-inside">
          <Typography variant="body1" component="div">
            <div className="message">
              <span>Author:</span>
              <span>
                MessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage
              </span>
            </div>
            <div className="message">
              <span>Author:</span>
              <span>Message</span>
            </div>
            <div className="message">
              <span>Author:</span>
              <span>Message</span>
            </div>
            <div className="message">
              <span>Author:</span>
              <span>Message</span>
            </div>
            <div className="message">
              <span>Author:</span>
              <span>Message</span>
            </div>
            {chats.map((chat) => {
              return (
                <div className="message">
                  <span>{chat.author}:</span>
                  <span>{chat.message}</span>
                </div>
              );
            })}
          </Typography>
        </CardContent>
      </Card>
      <div id="input-container">
        <TextField
          className="input"
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          value={username}
          id="password"
          type="text"
          label="Username"
          placeholder="Username"
        />
        <TextField
          className="input"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          type="text"
          label="Message"
          multiline
          rows={3}
        />
        <Button className="card-btn chat-btn" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
