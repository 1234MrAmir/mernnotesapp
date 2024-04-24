import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });

  const { name, email, password, cpassword } = credentials;
  const navigate = useNavigate(); // Move useNavigate inside the component

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      // alert('Password does not match');
      props.showAlert("danger", "Password does not match please check both password!!!!");

    } else {
      try {
        const response = await fetch(`http://localhost:4000/api/auth/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, cpassword }),
        });
        const data = await response.json();
        console.log(data);

        if (data.success) {
          localStorage.setItem('Token', data.authToken);
          navigate('/'); // Use navigate from the useNavigate hook
          props.showAlert("success", "Your details has been save successfully!!!");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3">
      <h3>Create an Account to use iNotebook</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" value={name} id="name" onChange={onChange} name="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="email" name="email" value={email} className="form-control" onChange={onChange} autoComplete="username" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" name="password" value={password} autoComplete="new-password" onChange={onChange} className="form-control" id="exampleInputPassword1" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label> 
          <input type="password" name="cpassword" autoComplete="new-password" onChange={onChange} className="form-control" id="cpassword" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
