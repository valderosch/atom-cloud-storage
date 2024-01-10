import Navbar from "./navbar/Navbar";
import './app.less';
import './neApp.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import {useSelector} from "react-redux";


function App() {
    const isUserAuthorised = useSelector(state => state.user.isAuthorised);

  return (
      <BrowserRouter>
          <div className="app">
              <Navbar/>
              <div className="wrap">
                  {!isUserAuthorised &&
                      <Routes>
                          <Route path="/registration" element={<Registration/>}/>
                          <Route path="/login" element={<Login/>}/>
                      </Routes>
                  }
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
