import { AppContext } from "../context/AppContext";
import { useState, useContext } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import showImg from "../../images/open-eye.png";
import hideImg from "../../images/close-eye.png";

function Login() {
  const [username, setUsername] = useState("");
  const [, setCurrentUser] = useContext(AppContext);
  const navigate = useNavigate();
  //show and hide Password
  const [pwd, setPwd] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);

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
      setCurrentUser({ ...user });
      navigate("/chat");
    }
  };

  const showResetBox = (e) => {
    e.preventDefault();
    alert("test");
  };

  const resetPassword = () => {};

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

        <p>
          <span title="reset password" onClick={showResetBox}>
            Forgot password?
          </span>
        </p>

        <form className="resetForm" onSubmit={resetPassword}>
          <input placeholder="Enter your email" type="email" /* value={email} */ />
          <button type="submit">Reset</button>
        </form>

        <button type="submit">Start Chat</button>
      </form>
    </div>
  );
}
export default Login;
