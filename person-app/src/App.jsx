import './App.css'
import { Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
    
  )
}

export default App
