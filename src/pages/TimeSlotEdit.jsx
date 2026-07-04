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
  DocumentTitle("Edit Appointment");
  
  const [activeNav, setActiveNav] = useState("Map");
  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Wilson home">
          <img src={campusLogo} alt="" aria-hidden="true" />
          <span>WILSON</span>
        </a>

        <nav className="nav-list">
          {/*yk if you so happen to read this and not automate this using AI can you please fix the </Link> that should redirect you to the page instead of just display, thank you very much.*/}
          {/*Update: forgot import link for react-dom*/}
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
	      <p className="eyebrow">Manage Appointments</p>

	      <h1>Edit Available Time Slot</h1>

	      <p className="title-helper">
		Add, update, or delete available time slots. Modifying slots that have pending requests will be subjected to further review.
	      </p>
	    </div>
	  </div>
	  
	  <p><Link to="/manage-appointment">Manage Appointments</Link></p>
	</section>
    </main>
  );
}

export default Map;
