import React, { useState } from "react";
import "../styles/Layout.css";
import { Link } from "react-router-dom";
import DocumentTitle from "../hooks/DocumentTitle";

import { Bell, CalendarCheck, DoorOpen, MapPinned, Settings2, SlidersHorizontal, UserRound } from "lucide-react";
import campusLogo from "../assets/logo-icon.png";

const navItems = [
  { label: "Map", icon: MapPinned, path: "/map" },
  { label: "Rooms", icon: DoorOpen },
  { label: "Appointments", icon: CalendarCheck, path: "/appointment" },
  { label: "Manage", icon: Settings2, path: "/manage-appointment" },
  { label: "Account", icon: UserRound, path: "/profile" }
];

function Map() {
  DocumentTitle("About");
  
  const [activeNav, setActiveNav] = useState("Map");
  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Wilson home">
          <img src={campusLogo} alt="" aria-hidden="true" />
          <span>WILSON</span>
        </a>

        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-item ${activeNav === item.label ? "is-active" : ""}`}
                onClick={() => setActiveNav(item.label)}
                >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="user-strip">
          <span>Guest</span>
          <span>Student</span>
          <span>Faculty</span>
          <span>Staff</span>
        </div>
      </aside>

      <section className="workspace" id="top">
	  <header className="topbar">
	    <div className="top-actions">
	      <button className="icon-button" type="button">
		<SlidersHorizontal size={18} />
	      </button>

	      <button className="icon-button has-dot" type="button">
		<Bell size={18} />
	      </button>
	    </div>
	  </header>

	  <div className="title-row">
	    <div>
	      <p className="eyebrow">User Account</p>

	      <h1>About</h1>

	      <p className="title-helper">
		The about page of the website
	      </p>
	    </div>
	  </div>
	  
	  <p><Link to="/profile">Go Back</Link></p>
	</section>
    </main>
  );
}

export default Map;
