import { Link } from "react-router-dom";
import logo from "../assets/logo-icon.png";

function LandingPage() {  
  return (
    <div className="home-container">
      <div className="hero-card">

        <img
          src={logo}
          alt="WILSON Logo"
          className="logo"
          width="200"
          height="200"
        />

        <h1>WILSON</h1>

        <h3>
          Web Interface for Location,
          Scheduling, and Office Navigation
        </h3>

        <p>
          A Campus Map and Appointment Scheduler
          for Ateneo de Naga University.
        </p>

        <div className="button-group" onClick={() => navigate("/map")}>
          <Link to="/map" className="map-btn">
            Campus Map
          </Link>

          <Link to="/login" className="login-btn">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default LandingPage;

