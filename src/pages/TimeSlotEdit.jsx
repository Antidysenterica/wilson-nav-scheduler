import { Link } from "react-router-dom";

function TimeSlotEdit() {
  return (
    <div>
      <h1>Edit Time Slot</h1>

      <ul>
      	<li><Link to="/map">Map</Link></li>
      	<li><Link to="/appointment">Schedule Appointment</Link></li>
      	<li><Link to="/manage-appointment">Manage Appointment</Link></li>
      	<li><Link to="/profile">User Profile</Link></li>
      </ul>
      
    </div>
  );
}

export default TimeSlotEdit;
