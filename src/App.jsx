import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";
import UserContext from "./AccountContext";
import socket from "./socket";

const App = () => {
  socket.connect();
  return (
    <UserContext>
      <Views />
      <ToggleColorMode />
    </UserContext>
  );
};

export default App;
