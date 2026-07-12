import { Link } from "react-router-dom";
import "../styles/NotFound.css";
import logo from "../assets/logo-icon.png";

function NotFound() {
  return (
    <div className="notfound-container">
      <article>
        <title>404 - Page Not Found</title>
      </article>

      <div className="notfound-content">
        <div className="hero-header">
          <img
            src={logo}
            alt="Wilson Logo"
            className="logo"
          />

          <h1>WILSON</h1>
        </div>

        <div className="notfound-card">
          <span className="error-code">404</span>

          <h2>Page Not Found</h2>

          <p>
            The page you are looking for does not exist,
            may have been moved, or you do not have
            permission to access it.
          </p>

          <div className="button-group">
            <Link to="/" className="home-btn">
              Back to Home
            </Link>

            <Link to="/map" className="map-btn">
              Campus Map
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
