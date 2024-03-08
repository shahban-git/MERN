import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import Signupgapge from './components/signupgapge';
import Privatecomponent from './components/privatecomponent';
import Login from './components/login';
import Addproduct from './components/addproduct';
import Poductlist from './components/ProductList';
import UpdateProductpage from './components/updateproduct';

function App() {

  return (
    <div className="App">
      <header className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
       <Route element={<Privatecomponent/>}>
       <Route path='/' element={<Poductlist/>}/>
       <Route path='/add' element={<Addproduct/>}/>
       <Route path='/update/:id' element={<UpdateProductpage/>}/>
       <Route path='/logout' element={<h1>logout component</h1>}/>
       <Route path='/profile' element={<h1>profile component</h1>}/>        
       <Route path='/delete' element={<h1>delete component</h1>}/>        
       </Route>    
       <Route  path='/Signup' element={<Signupgapge/>}/>   
       <Route  path='/login' element={<Login/>}/>   
      </Routes>
       </BrowserRouter>
     {/* <Footer/> */}
      </header>
    </div>
  );
}

export default App;

