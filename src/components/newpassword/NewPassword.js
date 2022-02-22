import { useState } from "react";
import { useParams } from "react-router-dom";


function NewPassword (){
  const [password,setPassword]=useState("");
  const [password2,setPassword2]=useState("");
  const id=useParams();
  const setHandlePassword = (e) => {
    const ipasswd = e.target.value;
    setPassword(ipasswd);
  };
    const setHandlePassword2 = (e) => {
      const ipasswd2 = e.target.value;
      setPassword2(ipasswd2);
    };
    const setNewPassword=async(e)=>{
      e.preventDefault();
        const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/setPassword`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: { id:id, password: password },
          }),
        }
      );
      if(response.ok){
        const message=await response.json();
        console.log(message);
        setPassword("");
        setPassword2("");
      }
      
    }
    return (
      <div className="newPassword">
        <form action="">
          <div>
            <label htmlFor="">new password:</label>
            <input
              type="password"
              value={password}
              onChange={setHandlePassword}
            />
          </div>
          <div>
            <label htmlFor="">confirm password:</label>
            <input
              type="password"
              value={password2}
              onChange={setHandlePassword2}
            />
          </div>
          <button onClick={setNewPassword}>Set New Password</button>
        </form>
      </div>
    );

}export default NewPassword