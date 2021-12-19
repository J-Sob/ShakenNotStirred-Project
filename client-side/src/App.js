import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import LogOut from './components/LogOut';
import AddCocktailForm from './components/AddCocktailForm'
import UserProfile from './components/UserProfile';
import Cocktail from './components/Cocktail';
import CocktailPage from './components/CocktailPage';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path="/*" element={<HomePage/>} />
          <Route exact path="/homepage" element={<HomePage/>} />
          <Route exact path="/login" element={<LogIn/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/logout" element={<LogOut/>} />
          <Route exact path="/addCocktail" element={<AddCocktailForm/>}/>
          <Route exact path="/profile" element={<UserProfile/>} />
          <Route exact path="/cocktails" element={<CocktailPage/>} />
          <Route exact path={"/cocktail/:id"}  element={<Cocktail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
