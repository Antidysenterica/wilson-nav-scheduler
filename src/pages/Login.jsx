import { useState } from "react";
import "./styles/Login.css";
import logoPath from "../assets/logo-icon.png";

const accountTypes = [
  "Guest",
  "College",
  "Graduate",
  "Faculty",
  "Staff",
];

const permissions = [
  {
    key: "student",
    tone: "blue",
    title: "Guest / Student / Graduate",
    description:
      "Search campus map, view room details, request appointment slots.",
    roles: ["Guest", "College", "Graduate"],
  },
  {
    key: "staff",
    tone: "gold",
    title: "Faculty / Staff",
    description:
      "Set office hours, class hours, availability, and approval mode.",
    roles: ["Faculty", "Staff"],
  },
];

const initialForm = {
  email: "student@gbox.adnu.edu.ph",
  password: "password",
  fullName: "",
  registerEmail: "",
  birthday: "",
  schoolId: "",
  newPassword: "",
  confirmPassword: "",
};

export default function Login() {
  const [screen, setScreen] = useState("login");
  const [selectedAccount, setSelectedAccount] = useState("Guest");
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isPermissionSelected = (item) =>
    item.roles.includes(selectedAccount);

  if (screen === "login") {
    return (
      <main className="screen login-screen">
        <div className="login-wrap">
          <div className="brand-lockup">
            <img src={logoPath} alt="Wilson logo" />
            <span>WILSON</span>
          </div>

          <section className="card login-card">
            <h1>Welcome back</h1>
            <p className="subtitle">
              Sign in to open maps and appointments.
            </p>

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </label>

            <div className="login-actions">
              <button className="primary-btn">
                Log in
              </button>

              <button
                className="secondary-btn"
                onClick={() => setScreen("register")}
              >
                Create account
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="screen register-screen">
      <section className="card create-card">
        <h1>Create account</h1>

        <div className="form-grid">
          <label className="field field-wide">
            <span>Full Name</span>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </label>

          <label className="field field-wide">
            <span>Email</span>
            <input
              type="email"
              name="registerEmail"
              value={form.registerEmail}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span>Birthday</span>
            <input
              type="text"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span>School ID</span>
            <input
              type="text"
              name="schoolId"
              value={form.schoolId}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span>Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </label>
        </div>

        <h2 className="section-title">Account Type</h2>

        <div className="account-tabs">
          {accountTypes.map((type) => (
            <button
              key={type}
              className={selectedAccount === type ? "active" : ""}
              onClick={() => setSelectedAccount(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <button
          className="primary-btn register-btn"
          onClick={() => setScreen("login")}
        >
          Register
        </button>
      </section>

      <aside className="card permissions-card">
        <h2>Role permissions</h2>

        <div className="permission-list">
          {permissions.map((item) => (
            <article
              key={item.key}
              className={`permission-note ${item.tone} ${
                isPermissionSelected(item) ? "selected" : ""
              }`}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </aside>
    </main>
  );
}
