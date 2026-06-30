// Landing Page
import LandingPage from "./pages/LandingPage";

// Page
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import ManageAppointments from "./pages/ManageAppointments";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import TimeSlotEdit from "./pages/TimeSlotEdit";

// Components
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/About" element={<About />} />
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ManageAppointments" element={<ManageAppointments />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/TimeSlotEdit" element={<TimeSlotEdit />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
