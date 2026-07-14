import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CreateScheduleModal from "../components/CreateScheduleModal";
import "../styles/Layout.css";
import DocumentTitle from "../hooks/DocumentTitle";
import { canAccess, getCurrentUser } from "../utils/permissions";
import { logout } from "../utils/auth";

import {
  Bell,
  LogOut,
  MapPinned,
  Settings2,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";
import campusLogo from "../assets/logo-icon.png";

const ROLE_NAMES = {
  1: "Guest",
  2: "College Student",
  3: "Graduate Student",
  4: "Faculty",
  5: "Staff",
  6: "Admin",
};

function TimeSlotEdit() {
  DocumentTitle("Edit Appointment");

  const [savedAvailability, setSavedAvailability] = useState({
    date: "2026-07-11",
    room: "DCS Office P200",
    repeat: "weekday",
    slots: [
      { start: "09:00", end: "09:20" },
      { start: "09:40", end: "10:00" },
    ],
  });

  const user = getCurrentUser();
  const isLoggedIn = user !== null;
  const isFacultyStaff = canAccess("FACULTY_STAFF");

  // Reserved for Faculty/Staff/Admin, reached only via the Manage tab.
  // If reached without an account, fall back to a minimal nav (Map + Log Out).
  const navItems = useMemo(() => {
    if (!isLoggedIn) {
      return [{ label: "Map", icon: MapPinned, path: "/map" }];
    }

    const items = [
      { label: "Map", icon: MapPinned, path: "/map" },
      { label: "Account", icon: UserRound, path: "/profile" },
    ];

    if (isFacultyStaff) {
      items.push({ label: "Manage", icon: Settings2, path: "/manage-appointment" });
    }

    return items;
  }, [isLoggedIn, isFacultyStaff]);

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
                className={`nav-item ${item.label === "Manage" ? "is-active" : ""}`}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button type="button" className="nav-item nav-item-button" onClick={logout}>
            <LogOut size={18} aria-hidden="true" />
            <span>Log Out</span>
          </button>
        </nav>

        <div className="user-strip">
          <span>{isLoggedIn ? ROLE_NAMES[user.role_id] ?? "Account" : "Not logged in"}</span>
        </div>
      </aside>

      <section className="workspace edit-slot-workspace" id="top">
        <header className="topbar">
          <div className="top-actions">
            <button className="icon-button" type="button" aria-label="Filters">
              <SlidersHorizontal size={18} aria-hidden="true" />
            </button>

            <button className="icon-button has-dot" type="button" aria-label="Notifications">
              <Bell size={18} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="title-row">
          <div>
            <p className="eyebrow">Manage Appointments</p>
            <h1>Edit Available Time Slot</h1>
            <p className="title-helper">
              Add, update, or delete available time slots before students request appointments.
            </p>
          </div>
        </div>

        <div className="edit-slot-grid">
          <CreateScheduleModal onSave={setSavedAvailability} />

          <aside className="availability-summary">
            <p className="eyebrow">Saved Availability</p>
            <h2>{savedAvailability.room}</h2>
            <p className="summary-date">{savedAvailability.date}</p>
            <p className="summary-repeat">Repeat: {savedAvailability.repeat}</p>

            <div className="summary-slots">
              {savedAvailability.slots.map((slot, index) => (
                <span key={`${slot.start}-${slot.end}-${index}`}>
                  {slot.start} - {slot.end}
                </span>
              ))}
            </div>

            <Link to="/manage-appointment" className="EditScheduleButton">
              Back to Requests
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default TimeSlotEdit;
