// Fix this later on
import Navbar from "./components/Navbar";
import Map from "./pages/Home";
import Login from "./pages/Home";
import Appointment from "./pages/Home";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Change Login to Landing Page later on (this is the one you will see if you want to log in or just want to view the map*/}
        <Route path="/" element={<Login />} />\
        
        <Route path="/Home" element={<Home />} />
        <Route path="/Appointment" element={<Appointment />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
