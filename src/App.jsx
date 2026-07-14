import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Landing Page
import LandingPage from "./pages/LandingPage";

// Page
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import ManageAppointment from "./pages/ManageAppointment";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import TimeSlotEdit from "./pages/TimeSlotEdit";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/Navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
        
      <Route path="/about" element={<About />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/login" element={<Login />} />
      <Route
	path="/manage-appointment"
	element={
	<ProtectedRoute permission="FACULTY_STAFF">
	    <ManageAppointment/>
	</ProtectedRoute>
	}
      />
      <Route path="/map" element={<Map />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/time-slot-edit" element={<TimeSlotEdit />} />
        
      <Route path="*" element={<NotFound />} />
        
    </Routes>
  );
}

export default App;
