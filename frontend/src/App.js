import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { useState } from 'react';

function App() {

const [alert, setAlert] = useState(null);
const showAlert =(type, message)=>{
  setAlert({
    type:type,
    message:message
  })
  setTimeout(() => {
    setAlert(null);
  }, 2000);
}

  return (
    <>
    <NoteState>
    <Router>
      <Navbar />
      <Alert alert={alert}/>      
      <Routes>
        <Route path="/" element={<Home showAlert={showAlert} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login showAlert={showAlert} />} />
        <Route path="/signUp" element={<SignUp showAlert={showAlert} />} />
      </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
