import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [Credentials, setCredentials] = useState({email:"", password:""})
  // using navigate to redirect the page
  const navigate = useNavigate();
  
  // ONSUBMIT FUNCTION
  const handleClick = async (e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/auth/login`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",        
      },
      body: JSON.stringify({email:Credentials.email, password:Credentials.password}),
    });
    const data = await response.json(); 
    console.log(data);
    if(data.success){
      // save the authtoken into localStorage and redirecting the page from notes
      localStorage.setItem('Token', data.authToken);
      // we are using navigate to redirect the page
      navigate("/");
      props.showAlert("success", "Account Login Successsfully");

    }
    else{
      // alert('Invalid Credentials');
      props.showAlert("danger", "Invalid Credientials");
    }

  }

  // ONCHANGE FUNCTION
 // ...Credentials: This is called the spread operator. It creates a shallow copy(milti-jhulti) of the current state (Credentials). It ensures that you don't directly modify the state, which is a React best practice.
  const onChange = (e)=>{
    setCredentials({...Credentials, [e.target.name]: e.target.value})
  }


  return (
   <div className='container mt-2'>
      <h3>Login to Continue to iNotebook</h3>
      <form onSubmit={handleClick}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email"  name='email' autoComplete='username' value={Credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" autoComplete='current-password' value={Credentials.password} className="form-control" onChange={onChange} name='password' id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button> 
</form>
    </div>
  )
}

export default Login
