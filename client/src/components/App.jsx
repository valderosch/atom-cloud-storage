import Navbar from "./navbar/Navbar";
import './app.less';
import './neApp.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {authentication} from "../actions/user";
import Disk from "./disk/Disk";
import {Navigate} from "react-router";
import Profile from "./profile/Profile";


function App() {
    const isUserAuthorised = useSelector(state => state.user.isAuthorised);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authentication());
        console.log('inited auth');
    }, [dispatch])

  return (
      <BrowserRouter>
          <div className="app">
              <Navbar/>
              <div className="wrap">
                  {!isUserAuthorised ?
                      <Routes>
                          <Route path="/registration" element={<Registration/>}/>
                          <Route path="/login" element={<Login/>}/>
                          <Route path="*" element={<Navigate to="/login" />} />
                      </Routes>
                      :
                      <Routes>
                          <Route exact path="/" element={<Disk/>}/>
                          <Route exact path="/profile" element={<Profile/>}/>
                          <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                  }
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
