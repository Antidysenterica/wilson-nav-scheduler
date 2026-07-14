import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Requests from "../components/Requests";
import FacultyAppointments from "../components/FacultyAppointments";
import { initialRequests } from "../data/requests";
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

function ManageAppointment() {
  DocumentTitle("Appointment Requests");

  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequestId, setSelectedRequestId] = useState(initialRequests[0]?.id);

  const user = getCurrentUser();
  const isLoggedIn = user !== null;
  const isFacultyStaff = canAccess("FACULTY_STAFF");

  // This page is Faculty/Staff/Admin only. If reached without an account,
  // fall back to a minimal nav (Map + Log Out).
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

  const selectedRequest = requests.find((request) => request.id === selectedRequestId);

  const counts = useMemo(() => {
    return requests.reduce(
      (current, request) => ({
        ...current,
        [request.status]: (current[request.status] || 0) + 1,
      }),
      {}
    );
  }, [requests]);

  function handleDecision(id, status, note) {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
              note,
            }
          : request
      )
    );
  }

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

      <section className="workspace manage-workspace" id="top">
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
            <h1>Approve Appointment</h1>
            <p className="title-helper">
              Select an appointment, review the details, and approve or reject the request.
            </p>
          </div>

          <div className="stat-row" aria-label="Approval summary">
            <div className="stat-pill">
              <strong>{counts.Pending || 0}</strong>
              <span>Pending</span>
            </div>
            <div className="stat-pill">
              <strong>{counts.Approved || 0}</strong>
              <span>Approved</span>
            </div>
            <div className="stat-pill">
              <strong>{counts.Rejected || 0}</strong>
              <span>Rejected</span>
            </div>
          </div>
        </div>

        <div className="manage-grid">
          <Requests
            requests={requests}
            selectedRequestId={selectedRequestId}
            onReview={setSelectedRequestId}
          />

          <FacultyAppointments
            request={selectedRequest}
            onDecision={handleDecision}
          />
        </div>

        <div className="workflow-links">
          <Link to="/time-slot-edit">Edit Available Time Slot</Link>
        </div>
      </section>
    </main>
  );
}

export default ManageAppointment;
