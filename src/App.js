import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Chat from "./components/chat/Chat";
import Verified from "./components/verified/Verified";
import MyProvider from "./components/context/AppContext";
import AllUsersProvider from "./components/context/AllUsersContext";
//test comment
function App() {
  return (
    <div className="app">
      <MyProvider>
        <AllUsersProvider>
        
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/verify" element={<Verified />} />
          </Routes>
        </AllUsersProvider>
      </MyProvider>
    </div>
  );
}

export default App;
