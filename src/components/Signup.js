import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name:"",email: "", password: "" });
 let navigate = useNavigate();
 const API_BASE_URL = process.env.REACT_APP_API_URL;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${API_BASE_URL}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      props.showAlert("User have been registered","success")
        navigate('/')
    }
    else{
      props.showAlert("Invalid credentials","danger")
      navigate('/signup')
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  // Handle the login logic here (e.g., API calls, validation)
  // console.log(emailOrUsername, password, rememberMe);
  return (
    <>
      <div className="container mt-4">
      <h2>Create an account to continue using iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="name" class="form-label">
              Name
            </label>
            <input type="text" class="form-control" id="name" aria-describedby="name" name="name" onChange={onChange} />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"name="email" onChange={onChange} />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input type="password" onChange={onChange} class="form-control"name="password" id="exampleInputPassword1" />
          </div>
          {/* <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
          <button type="submit" class="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
