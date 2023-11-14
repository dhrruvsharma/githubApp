import './index.css';
import Home from "./components/Home/Home";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Users from "./components/Users/Users"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user/:login" element = {<Users/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
