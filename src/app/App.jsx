import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import { Home, Company, AddSalary, Login, Logout } from './../pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth'>
          <Route path='login' element={<Login/>}/>
          <Route path='logout' element={<Logout/>}/>
        </Route>
        <Route path='/' element={<MainLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='company' element={<Company/>}/>
          <Route path='addsalary' element={<AddSalary/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
