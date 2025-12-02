import { io } from "socket.io-client";
const socket = new io(import.meta.env.VITE_SERVER_URL, {
  autoConnect: true,
  transports: ["websocket", "polling", "flashsocket"],
  withCredentials: true,
});

export default socket;
