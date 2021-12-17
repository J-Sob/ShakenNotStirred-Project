import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import LogOut from './components/LogOut';
import ImagePreviewTest from './components/ImagePreviewTest';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/homepage" element={<HomePage/>} />
          <Route exact path="/login" element={<LogIn/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/logout" element={<LogOut/>} />
          <Route exact path="/imageprev" element={<ImagePreviewTest/>}/>
          <Route exact path="/profile" element={<UserProfile/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
