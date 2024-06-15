import Login from "./member/Login";
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
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;