import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
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
  email: "",
  password: "",
  fullName: "",
  registerEmail: "",
  birthday: "",
  newPassword: "",
  confirmPassword: "",
};

export default function Login() {
  const [screen, setScreen] = useState("login");
  const [selectedAccount, setSelectedAccount] = useState("Guest");
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (
      !form.fullName ||
      !form.registerEmail ||
      !form.birthday ||
      !form.newPassword
    ) {
      alert("Please complete all fields.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const roleMap = {
      Guest: 1,
      College: 2,
      Graduate: 3,
      Faculty: 4,
      Staff: 5,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          full_name: form.fullName,
          email: form.registerEmail,
          password: form.newPassword,
          birthday: form.birthday,
          role_id: roleMap[selectedAccount],
        }
      );

      alert(res.data.message);

      setForm(initialForm);
      setSelectedAccount("Guest");
      setScreen("login");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Registration failed.");
    }
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
                <Link to="/map">Log in</Link>
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
              placeholder="Juan Dela Cruz"
            />
          </label>

          <label className="field field-wide">
            <span>Email</span>
            <input
              type="email"
              name="registerEmail"
              value={form.registerEmail}
              onChange={handleChange}
              placeholder="student@gbox.adnu.edu.ph"
            />
          </label>

          <label className="field field-wide">
            <span>Birthday</span>
            <input
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
            />
          </label>

          <label className="field field-wide">
            <span>Password</span>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Password"
            />
          </label>

          <label className="field field-wide">
            <span>Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </label>
        </div>

        <h2 className="section-title">Account Type</h2>

        <div className="account-tabs">
          {accountTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={selectedAccount === type ? "active" : ""}
              onClick={() => setSelectedAccount(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="primary-btn register-btn"
          onClick={handleRegister}
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