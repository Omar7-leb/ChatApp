import {Routes , Route , Navigate} from "react-router-dom"
import Chat from "./components/pages/Chat";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./components/context/AuthContext";
import { ChatContextProvider } from "./components/context/ChatContext";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <ChatContextProvider user ={user}>
    <Navbar/>
     <Container>
  <Routes>
    <Route path="/" element={user ? <Chat /> : <Login/>} />
    <Route path="/login" element={user ? <Chat/> : <Login />} />
    <Route path="/register" element={user ? <Chat/> : <Register />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  </Container>
    </ChatContextProvider>
   
  );
      
}

export default App;
