import "./signup.css";
import validate from "./validation";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";

function Signup() {
  //const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});

  const clearForm = () => {
    setValues({ username: "", email: "", password: "", password2: "" });
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
      const response = await fetch("http://localhost:5000/signup", {
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
      });
      if (response.ok) {
        setMessage( `Hi ${values.username}, please confirm your email`
        );
        clearForm();
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

        <input
          name="password"
          type="password"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}

        <input
          name="password2"
          type="password"
          placeholder="confirm password"
          value={values.password2}
          onChange={handleChange}
        />
        {errors.password2 && <p>{errors.password2}</p>}

        <button type="submit">Create My Account</button>
      </form>
      <h3>{message}</h3>
    </div>
  );
}
export default Signup;
