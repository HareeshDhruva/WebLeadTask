import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import RegisterPage from './components/RegisterPage';
import Admin from './components/Admin';
import User from './components/User';
import PageNotFound from './components/PageNotFound';
import { useSelector } from 'react-redux';

function App() {
  const {isAuth} = useSelector((state)=> state.root);
 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterPage/>}/>
        <Route path='/admin' element={isAuth? <Admin/>: <RegisterPage/>}/>
        <Route path='/user' element={isAuth? <User/> : <RegisterPage/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
