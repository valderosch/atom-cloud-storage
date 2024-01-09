import Navbar from "./navbar/Navbar";
import './app.less';
import './neApp.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Registration from "./registration/Registration";


function App() {
  return (
      <BrowserRouter>
          <div className="app">
              <Navbar/>
              <div className="wrap">
                  <Routes>
                      <Route path="/registration" element={<Registration/>}/>
                  </Routes>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
