import { Link } from "react-router-dom";

function ManageAppointment() {
  return (
    <div>
      <h1>Manage Appointment</h1>
      
      <ul>
      	<li><Link to="/map">Map</Link></li>
      	<li><Link to="/appointment">Schedule Appointment</Link></li>
      	<li><Link to="/manage-appointment">Manage Appointment</Link></li>
      	<li><Link to="/profile">User Profile</Link></li>
      </ul>
      
      <p><Link to="/time-slot-edit">Edit Available Time Slot</Link></p>
    </div>
  );
}

export default ManageAppointment;
