//import { AppContext } from "../context/AppContext";
import { useState } from "react";
import "./login.css";
import { useNavigate } from 'react-router-dom';
//import logo from "../../images/Logo.png";
import showImg from "../../images/open-eye.png";
import hideImg from "../../images/close-eye.png";

function Login() {
  const [username,setUsername] = useState("");
  //const [currentUser, setCurrentUser] = useContext(AppContext);
  const navigate = useNavigate();
 //show and hide Password
  const [pwd, setPwd] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  ///////////////////////////////////////////////////////////////////////////////////
  const handleUsername = (e) => {
    const iusername = e.target.value;
    setUsername(iusername);
  };
  
  const makeConnection = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {username:username,password:pwd},
      }),
    });
    if (response.ok) {
      navigate("/chat");
    }
   
    
    //////////make a real database connection ////////////////////////
  };

  //////////////////////////////////////////////////////////////////////////////
  return (
    <div className="login">
{/*       <img src={logo} alt="Logo" /> */}
      
        <form action="">
          <input
            type="text"
            placeholder=" username"
            onChange={handleUsername}
            value={username}
          />
          <div className="pwd-container">
            <input
              placeholder=" password"
              type={isRevealPwd ? "text" : "password"}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <img
              alt="Hide password"
              title={isRevealPwd ? "Hide password" : "Show password"}
              src={isRevealPwd ? hideImg : showImg}
              onClick={() => setIsRevealPwd((prevState) => !prevState)}
            />
          </div>

          <p><a href="/" title="Not yet coded :D">Forgot password?</a></p>
          
          <button onClick={makeConnection}>Start Chat</button>
        </form>
      

    </div>
  );
}
export default Login; 
