import { useState } from "react";
import "./forgetpassword.css"

function ForgetPassword (){
  const [email,setEmail]=useState("");

  const setHandleEmail=(e)=>{
    const iemail = e.target.value;
    setEmail(iemail);
  }
  const sendEmail=async(e)=>{
      e.preventDefault();
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/forgetPassword`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: { email: email },
          }),
        }
      ); 
if(response.ok){
  setEmail("");
}
  }
    return (
      <div className="resetPassword">
            <input placeholder="Enter your email" type="email" value={email} onChange={setHandleEmail}/>
            <button onClick={sendEmail}>Send Email</button>
      </div>
    );
}export default ForgetPassword;