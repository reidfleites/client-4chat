import { useState } from "react";
import { useParams } from "react-router-dom";
import "./newpassword.css";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const id = useParams();
  const [userMessage, setUserMessage] = useState("");
  const setHandlePassword = (e) => {
    const ipasswd = e.target.value;
    setPassword(ipasswd);
  };
  const setHandlePassword2 = (e) => {
    const ipasswd2 = e.target.value;
    setPassword2(ipasswd2);
  };

  const setNewPassword = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setUserMessage("Passwords do not match");
    }
    if (password === password2) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/setPassword`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: { id: id, password: password },
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserMessage(data.message);
        setPassword("");
        setPassword2("");
      }
    }
  };

  return (
    <div className="newPassword">
      <form>
        <div>
          <input
            className="setPass"
            type="password"
            placeholder="new password"
            value={password}
            onChange={setHandlePassword}
          />
        </div>
        <div>
          <input
            className="setPass"
            placeholder="confirm password"
            type="password"
            value={password2}
            onChange={setHandlePassword2}
          />
        </div>
        <button className="sendButton" onClick={setNewPassword}>
          Set New Password
        </button>
      </form>
      {userMessage}
    </div>
  );
}
export default NewPassword;
