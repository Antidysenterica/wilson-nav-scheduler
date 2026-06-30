import { Link } from "react-router-dom";

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <ul>
      	<li><Link to="/map">Map</Link></li>
      	<li><Link to="/appointment">Schedule Appointment</Link></li>
      	<li><Link to="/manage-appointment">Manage Appointment</Link></li>
      	<li><Link to="/profile">User Profile</Link></li>
      </ul>
      
      <p><Link to="/">Log Out</Link></p>
    </div>
  );
}

export default Profile;
