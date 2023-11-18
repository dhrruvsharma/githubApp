import './index.css';
import Home from "./components/Home/Home";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Users from "./components/Users/Users"
import Followers from "./components/Followers/Followers"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user/:login" element = {<Users/>}/>
        <Route path="user/:login/followers" element = {<Followers />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
