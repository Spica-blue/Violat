// App.js

import Login from "./member/Login";
import Sign_up from "./member/Sign_up";
import Mainpage from './main/Mainpage';
import { BrowserRouter, Route, Routes} from "react-router-dom";


function App() {

  return (
    <div className="App">
      {/* <Login/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Mainpage/>} />
          <Route path="/login" element= {<Login/>} />
          <Route path="/Sign_up" element= {<Sign_up/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;