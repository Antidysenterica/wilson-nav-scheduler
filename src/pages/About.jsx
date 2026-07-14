import React, { useMemo } from "react";
import "../styles/Layout.css";
import { Link } from "react-router-dom";
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

function About() {
  DocumentTitle("About");

  const user = getCurrentUser();
  const isLoggedIn = user !== null;
  const isFacultyStaff = canAccess("FACULTY_STAFF");

  // About is only reachable by account holders. If somehow reached without
  // an account, fall back to a minimal nav (Map + Log Out) as a safety net.
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
              <Link key={item.label} to={item.path} className="nav-item">
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

export default About;
