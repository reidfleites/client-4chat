//import { AppContext } from "../context/AppContext";
import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import showImg from "../../images/open-eye.png";
import hideImg from "../../images/close-eye.png";
import ForgetPassword from "../resetpassword/ForgetPassword";

function Login() {
  //const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  //const [setCurrentUser] = useContext(AppContext);
  const navigate = useNavigate();
  //show and hide Password
  const [pwd, setPwd] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [showResetPasswComponent,setShowResetPasswComponent]=useState(false);

  const handleUsername = (e) => {
    const iusername = e.target.value;
    setUsername(iusername);
  };

  const makeConnection = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: { username: username, password: pwd },
      }),
    });
    if (response.ok) {
      const user = await response.json();
      console.log(user);
     // setCurrentUser({ ...user });
      navigate("/chat");
    }
  };

  const showComponent = (e) => {
    e.preventDefault();
   setShowResetPasswComponent(!showResetPasswComponent);
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={makeConnection}>
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
        {!showResetPasswComponent && <button type="submit">Start Chat</button>}
      </form>
      <p>
        <span title="reset password" onClick={showComponent}>
          Forgot password?
        </span>
      </p>
      {showResetPasswComponent && <ForgetPassword />}
    </div>
  );
}
export default Login;
