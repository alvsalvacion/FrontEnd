// import './Components/Assets/App.css'
import { Home } from "./Components/Pages/Home";
import { Login } from './Components/LoginSignup/Login';
import Signup from "./Components/LoginSignup/Signup";
import  VerifyEmail  from "./Components/Pages/VerifyEmail";
import { Contact } from "./Components/Pages/Contact";
import { ChangePassword } from "./Components/LoginSignup/ChangePassword";
import { ForgotPassword } from './Components/LoginSignup/ForgotPassword';
import { ContextProvider } from './Components/Context/ContextProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <ContextProvider>
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/change-password/:userId" element={<ChangePassword/>}/>
          <Route path="/email-verified/:userId" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </ContextProvider>
  );
}

export default App;
