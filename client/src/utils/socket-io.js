import socketIOClient from 'socket.io-client';
const isDev = process.env.NODE_ENV === 'development';

// If your backend server is on a different port than 8080, replace it with that.
const ENDPOINT = 'http://127.0.0.1:8080';

const socketIo = isDev ? socketIOClient(ENDPOINT) : socketIOClient();

export default socketIo;
