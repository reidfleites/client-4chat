import "./signup.css";
import validate from "./validation";
import { useState } from "react";
import showImg from "../../images/open-eye.png";
import hideImg from "../../images/close-eye.png";

function Signup() {
  const [message, setMessage] = useState("");
  const [showButton,setShowButton]=useState(true);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordconfirm: "",
  });

  const [errors, setErrors] = useState({});
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isReveal, setIsReveal] = useState(false);

  const clearForm = () => {
    setValues({ username: "", email: "", password: "", passwordconfirm: "" });
    setErrors({});
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(values));
    if (Object.keys(errors).length === 0) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: {
              name: values.username,
              email: values.email,
              password: values.password,
            },
          }),
        }
      );
      setShowButton(false);
      setMessage("Creating user...")
      if (response.ok) {
        setMessage(`Hi ${values.username}, please confirm your email`);
        setShowButton(true);
        clearForm();
      }
      else{
        const data=await response.json();
        const userMessage=data.message;
        setMessage(userMessage);
      }
    }
  };
  return (
    <div className="signup">
      <form action="" onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={values.username}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}

        <input
          name="email"
          type="email"
          placeholder="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}

        <div className="pwd-container">
          <input
            name="password"
            autoComplete="on"
            placeholder=" password"
            type={isRevealPwd ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}

          <img
            alt="Hide password"
            title={isRevealPwd ? "Hide password" : "Show password"}
            src={isRevealPwd ? hideImg : showImg}
            onClick={() => setIsRevealPwd((prevState) => !prevState)}
          />
        </div>

        <div className="pwd-container-confirm">
          <input
            name="passwordconfirm"
            autoComplete="on"
            placeholder=" confirm password"
            type={isReveal ? "text" : "password"}
            value={values.passwordconfirm}
            onChange={handleChange}
          />
          {errors.passwordconfirm && <p>{errors.passwordconfirm}</p>}
          <img
            className="img2"
            alt="Hide password"
            title={isReveal ? "Hide password" : "Show password"}
            src={isReveal ? hideImg : showImg}
            onClick={() => setIsReveal((prevState) => !prevState)}
          />
        </div>
        {showButton && <button type="submit">Create My Account</button>}
      </form>
      <h3>{message}</h3>
    </div>
  );
}
export default Signup;
