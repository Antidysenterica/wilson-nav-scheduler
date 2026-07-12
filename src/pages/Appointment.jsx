import React, { useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "../components/Calendar";
import TimeSlotSelection from "../components/TimeSlotSelection";
import "../styles/Layout.css";
import DocumentTitle from "../hooks/DocumentTitle";

import {
  Bell,
  CalendarCheck,
  CheckCircle2,
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

function Appointment() {
  DocumentTitle("Schedule Appointments");

  const [selectedDate, setSelectedDate] = useState(null);
  const [lastRequest, setLastRequest] = useState(null);

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
                className={`nav-item ${item.label === "Appointments" ? "is-active" : ""}`}
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

      <section className="workspace appointment-workspace" id="top">
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
            <p className="eyebrow">Appointment</p>
            <h1>Schedule Appointment</h1>
            <p className="title-helper">
              Pick an available date, choose a time slot, and submit your request for approval.
            </p>
          </div>

          <div className="stat-row" aria-label="Appointment summary">
            <div className="stat-pill">
              <strong>3</strong>
              <span>Open dates</span>
            </div>
            <div className="stat-pill">
              <strong>17</strong>
              <span>Open slots</span>
            </div>
          </div>
        </div>

        <div className="appointment-grid">
          <section className="appointment-panel calendar-panel">
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={(date) => {
                setSelectedDate(date);
                setLastRequest(null);
              }}
            />
          </section>

          <section className="appointment-panel booking-panel">
            <TimeSlotSelection
              selectedDate={selectedDate}
              onRequest={setLastRequest}
            />
          </section>
        </div>

        {lastRequest && (
          <section className="success-banner" aria-live="polite">
            <CheckCircle2 size={18} aria-hidden="true" />
            <span>
              Requested successfully: {lastRequest.date}, {lastRequest.startTime} - {lastRequest.endTime}.
            </span>
          </section>
        )}

        <div className="workflow-links">
          <Link to="/manage-appointment">Approve Appointment</Link>
          <Link to="/time-slot-edit">Edit Available Time Slot</Link>
        </div>
      </section>
    </main>
  );
}

export default Appointment;
