import { Link } from "react-router-dom";

function Map() {
  return (
    <div>
      <h1>Campus Map</h1>
      <img src="/campus-map.png" alt="Map" width="600" />
      
      <ul>
      	<li><Link to="/map">Map</Link></li>
      	<li><Link to="/appointment">Schedule Appointment</Link></li>
      	<li><Link to="/manage-appointment">Manage Appointment</Link></li>
      	<li><Link to="/profile">User Profile</Link></li>
      </ul>
    </div>
  );
}

export default Map;
