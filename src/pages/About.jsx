import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <h1>About</h1>
      
      <ul>
      	<li><Link to="/map">Map</Link></li>
      	<li><Link to="/appointment">Schedule Appointment</Link></li>
      	<li><Link to="/manage-appointment">Manage Appointment</Link></li>
      	<li><Link to="/profile">User Profile</Link></li>
      </ul>
      
      
      <p>WILSON: Web Interface for Location, Scheduling, and Office Navigation</p>
      <p>A Campus Map + Appointment Scheduler for Ateneo de Naga University</p>
      <p>This system is designed to help students, faculty, staff, and visitors easily navigate university facilities and efficiently schedule appointments with campus offices and personnel.</p>
    </div>
  );
}

export default About;
