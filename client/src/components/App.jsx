import Navbar from "./navbar/Navbar";
import './app.less';
import './neApp.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {authentication} from "../actions/user";


function App() {
    const isUserAuthorised = useSelector(state => state.user.isAuthorised);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authentication())
    }, [dispatch])

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
