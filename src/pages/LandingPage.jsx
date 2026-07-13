import { Link } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/logo-icon.png";

function LandingPage() {
  return (
    <div className="home-container">
    
     <article>
      	<title>Homepage</title>
     </article>

      <div className="landing-content">

        <div className="hero-header">
          <img
            src={logo}
            alt="Wilson Logo"
            className="logo"
          />

          <h1>WILSON</h1>
        </div>

        <div className="hero-card">

          <h3>
            Web Interface for Location,
            <br />
            Scheduling, and Office Navigation
          </h3>

          <p>
            A Campus Map + Appointment Scheduler for Ateneo de Naga University.
            This system is designed to help students, faculty, staff, and visitors
            easily navigate university facilities and efficiently schedule
            appointments with campus offices and personnel.
          </p>

          <div className="button-group">

            <Link to="/map" className="map-btn">
              View Campus Map
            </Link>

            <Link to="/login" className="login-btn">
              Log in
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LandingPage;
