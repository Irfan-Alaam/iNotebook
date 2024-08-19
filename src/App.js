// import { createRoot } from "react-dom/client";
import {useState} from "react";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import Alert from "./components/Alert";
import Aboutus from "./components/Aboutus";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Library from "./components/Library";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";


function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message,type)=>{
    setAlert({
      msg : message,
      type: type
    })
    setTimeout(() => {
      showAlert (null)
     }, 2000);
  }
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
          <Route exact path="/aboutus" element={<Aboutus/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/library" element={<Library/>}/>
          <Route exact path="/services" element={<Services/>}/>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
