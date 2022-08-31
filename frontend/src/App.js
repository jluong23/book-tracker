import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import useAuthContext from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
function App() {
  const {user} = useAuthContext();
  console.log("AuthContext: ", user);
  return (
    <div className="App h-screen flex flex-col">
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to='/login'/>}/>
            <Route path="/login" element={ user ? <Navigate to='/'/> : <Login/>}/>
            <Route path="/signup" element={ user ? <Navigate to='/'/> : <Signup/>}/>
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
