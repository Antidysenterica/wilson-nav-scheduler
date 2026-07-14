import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Layout.css";
import DocumentTitle from "../hooks/DocumentTitle";
import { canAccess, getCurrentUser } from "../utils/permissions";
import { logout } from "../utils/auth";

import {
  Eye,
  EyeOff,
  KeyRound,
  LogOut,
  MapPinned,
  Save,
  Settings2,
  UserPen,
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

const profileDefaults = {
  fullName: "Juan Dela Cruz",
  email: "juan@gbox.adnu.edu.ph",
  idNumber: "2026-00001",
  accountType: "Student account",
  birthday: "2004-05-14",
  contact: "0917 000 0000",
  department: "College of Computer Studies",
};

function Profile() {
  DocumentTitle("User Profile");

  const [profile, setProfile] = useState(profileDefaults);
  const [activePanel, setActivePanel] = useState(null);
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [publicProfile, setPublicProfile] = useState(true);

  const user = getCurrentUser();
  const isLoggedIn = user !== null;
  const isFacultyStaff = canAccess("FACULTY_STAFF");

  // Profile requires an account. If reached without one, fall back to a
  // minimal nav (Map + Log Out).
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

  const handleProfileChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    setProfileMessage("Profile changes saved for this session.");
  };

  const handlePasswordChange = (event) => {
    setPasswordForm({
      ...passwordForm,
      [event.target.name]: event.target.value,
    });
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      setPasswordMessage("Complete all password fields.");
      return;
    }

    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordMessage("New passwords do not match.");
      return;
    }

    setPasswordForm({ current: "", next: "", confirm: "" });
    setPasswordMessage("Password change request saved.");
  };

  return (
    <main className="app-shell profile-shell">
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
                className={`nav-item ${item.label === "Account" ? "is-active" : ""}`}
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

      <section className="workspace profile-workspace" id="top">
        <section className="profile-dashboard-hero" aria-label="Account summary">
          <div className="profile-avatar-art" aria-hidden="true" />

          <div className="profile-hero-copy">
            <h1>{profile.fullName}</h1>
            <p>{profile.accountType}</p>
          </div>

          <button type="button" className="dashboard-logout" onClick={logout}>
            <span>Log Out</span>
          </button>
        </section>

        <div className="profile-dashboard-grid">
          <div className="profile-dashboard-main">
            <section className="dashboard-card">
              <header className="dashboard-card-header">
                <span>Account</span>
              </header>

              <div className="dashboard-action-stack">
                <button
                  type="button"
                  className={`dashboard-row ${activePanel === "edit" ? "is-open" : ""}`}
                  onClick={() => {
                    setActivePanel("edit");
                    setProfileMessage("");
                  }}
                >
                  <span className="dashboard-row-icon" aria-hidden="true">E</span>
                  <span>
                    <strong>Edit Profile</strong>
                    <small>Change your profile information</small>
                  </span>
                </button>

                <button
                  type="button"
                  className={`dashboard-row ${activePanel === "password" ? "is-open" : ""}`}
                  onClick={() => {
                    setActivePanel("password");
                    setPasswordMessage("");
                  }}
                >
                  <span className="dashboard-row-icon" aria-hidden="true">P</span>
                  <span>
                    <strong>Change Password</strong>
                    <small>Update your password</small>
                  </span>
                </button>
              </div>

              {profileMessage && <p className="dashboard-note">{profileMessage}</p>}
              {passwordMessage && <p className="dashboard-note">{passwordMessage}</p>}
            </section>

            <section className="dashboard-card">
              <header className="dashboard-card-header">
                <span>Privacy</span>
              </header>

              <div className="privacy-row">
                <div>
                  <strong>Public Profile</strong>
                  <small>Your profile is visible to everyone</small>
                </div>

                <button
                  type="button"
                  className={`profile-toggle ${publicProfile ? "is-on" : ""}`}
                  aria-label="Toggle public profile"
                  aria-pressed={publicProfile}
                  onClick={() => setPublicProfile((current) => !current)}
                >
                  <span />
                </button>
              </div>
            </section>

            <section className="dashboard-card">
              <header className="dashboard-card-header">
                <span>Support</span>
              </header>

              <Link to="/about" className="dashboard-row support-row">
                <span className="dashboard-row-icon" aria-hidden="true">?</span>
                <span>
                  <strong>Help &amp; Support</strong>
                  <small>Get help and contact us</small>
                </span>
              </Link>
            </section>

            {activePanel === "edit" && (
              <section className="dashboard-card profile-detail-card" aria-label="Edit profile">
                <header className="detail-card-heading">
                  <div>
                    <span>Edit Profile</span>
                    <h2>{profile.fullName}</h2>
                  </div>
                  <UserPen size={20} aria-hidden="true" />
                </header>

                <form className="profile-form" onSubmit={handleProfileSubmit}>
                  <label>
                    <span>Full Name</span>
                    <input
                      type="text"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleProfileChange}
                    />
                  </label>

                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                    />
                  </label>

                  <label>
                    <span>ID Number</span>
                    <input
                      type="text"
                      name="idNumber"
                      value={profile.idNumber}
                      onChange={handleProfileChange}
                    />
                  </label>

                  <label>
                    <span>Birthday</span>
                    <input
                      type="date"
                      name="birthday"
                      value={profile.birthday}
                      onChange={handleProfileChange}
                    />
                  </label>

                  <label>
                    <span>Contact Number</span>
                    <input
                      type="text"
                      name="contact"
                      value={profile.contact}
                      onChange={handleProfileChange}
                    />
                  </label>

                  <label>
                    <span>Department</span>
                    <input
                      type="text"
                      name="department"
                      value={profile.department}
                      onChange={handleProfileChange}
                    />
                  </label>

                  <div className="password-actions">
                    <button
                      type="button"
                      className="outline-action"
                      onClick={() => setActivePanel(null)}
                    >
                      <span>Cancel</span>
                    </button>

                    <button type="submit" className="primary-button">
                      <Save size={16} aria-hidden="true" />
                      <span>Save Profile</span>
                    </button>
                  </div>
                </form>
              </section>
            )}

            {activePanel === "password" && (
              <section className="dashboard-card profile-detail-card" aria-label="Change password">
                <header className="detail-card-heading">
                  <div>
                    <span>Security</span>
                    <h2>Change Password</h2>
                  </div>
                  <KeyRound size={20} aria-hidden="true" />
                </header>

                <form className="profile-form password-form" onSubmit={handlePasswordSubmit}>
                  <label>
                    <span>Current Password</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="current"
                      value={passwordForm.current}
                      onChange={handlePasswordChange}
                    />
                  </label>

                  <label>
                    <span>New Password</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="next"
                      value={passwordForm.next}
                      onChange={handlePasswordChange}
                    />
                  </label>

                  <label>
                    <span>Confirm New Password</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirm"
                      value={passwordForm.confirm}
                      onChange={handlePasswordChange}
                    />
                  </label>

                  <div className="password-actions">
                    <button
                      type="button"
                      className="outline-action"
                      onClick={() => setShowPassword((current) => !current)}
                    >
                      {showPassword ? (
                        <EyeOff size={16} aria-hidden="true" />
                      ) : (
                        <Eye size={16} aria-hidden="true" />
                      )}
                      <span>{showPassword ? "Hide" : "Show"}</span>
                    </button>

                    <button type="submit" className="primary-button">
                      <Save size={16} aria-hidden="true" />
                      <span>Save Password</span>
                    </button>
                  </div>
                </form>
              </section>
            )}
          </div>

          <aside className="profile-shortcut-panel" aria-label="Dashboard shortcuts">
            <Link to="/map" className="shortcut-button">
              <span>View Campus Map</span>
            </Link>

            <Link to="/appointment" className="shortcut-button is-primary">
              <span>Appoint a Schedule</span>
            </Link>

            {isFacultyStaff && (
              <Link to="/manage-appointment" className="shortcut-button">
                <span>Approve a Schedule</span>
              </Link>
            )}

            {isFacultyStaff && (
              <Link to="/time-slot-edit" className="shortcut-button">
                <span>Edit Schedule</span>
              </Link>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Profile;
