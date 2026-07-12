import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateScheduleModal from "../components/CreateScheduleModal";
import "../styles/Layout.css";
import DocumentTitle from "../hooks/DocumentTitle";

import {
  Bell,
  CalendarCheck,
  DoorOpen,
  MapPinned,
  Settings2,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";
import campusLogo from "../assets/logo-icon.png";

const navItems = [
  { label: "Map", icon: MapPinned, path: "/map" },
  { label: "Rooms", icon: DoorOpen, path: "/map" },
  { label: "Appointments", icon: CalendarCheck, path: "/appointment" },
  { label: "Manage", icon: Settings2, path: "/manage-appointment" },
  { label: "Account", icon: UserRound, path: "/profile" },
];

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
        </nav>

        <div className="user-strip">
          <span>Guest</span>
          <span>Student</span>
          <span>Faculty</span>
          <span>Staff</span>
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
