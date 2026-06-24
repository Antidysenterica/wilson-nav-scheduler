function Home() {
  return (
    <div className="home-container">
      <div className="hero-card">

        <img
          src="/logo.png"
          alt="WILSON Logo"
          className="logo"
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

        <div className="button-group">
          <button className="map-btn">
            View Campus Map
          </button>

          <button className="login-btn">
            Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default Home;