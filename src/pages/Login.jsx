import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import "../styles/Login.css";
import logoPath from "../assets/logo-icon.png";

const API_BASE_URL = "https://wilson-nav-backend.onrender.com";

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
  id_number: "",
  newPassword: "",
  confirmPassword: "",
};

const roleMap = {
  Guest: 1,
  College: 2,
  Graduate: 3,
  Faculty: 4,
  Staff: 5,
};

export default function Login() {
  const navigate = useNavigate();

  const [screen, setScreen] = useState("login");
  const [selectedAccount, setSelectedAccount] = useState("Guest");
  const [form, setForm] = useState(initialForm);
  const [passwordVisibility, setPasswordVisibility] = useState({
    login: false,
    register: false,
    confirm: false,
  });

  const requiresIdNumber = selectedAccount !== "Guest";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = (field) => {
    setPasswordVisibility((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const handleAccountSelect = (type) => {
    setSelectedAccount(type);

    if (type === "Guest") {
      setForm((current) => ({
        ...current,
        id_number: "",
      }));
    }
  };

  const handleGoBack = () => {
    setForm(initialForm);
    setSelectedAccount("Guest");
    setScreen("login");
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);

      navigate("/map");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  const handleRegister = async () => {
    if (
      !form.fullName ||
      !form.registerEmail ||
      !form.birthday ||
      !form.newPassword ||
      !form.confirmPassword ||
      (requiresIdNumber && !form.id_number)
    ) {
      alert("Please complete all required fields.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        full_name: form.fullName,
        id_number: form.id_number.trim() || null,
        email: form.registerEmail,
        password: form.newPassword,
        birthday: form.birthday,
        role_id: roleMap[selectedAccount],
      });

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
              <div className="password-field">
                <input
                  type={passwordVisibility.login ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePassword("login")}
                  aria-label={
                    passwordVisibility.login ? "Hide password" : "Show password"
                  }
                >
                  {passwordVisibility.login ? (
                    <EyeOff size={18} aria-hidden="true" />
                  ) : (
                    <Eye size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
            </label>

            <div className="login-actions">
              <button
                className="primary-btn"
                type="button"
                onClick={handleLogin}
              >
                Log in
              </button>

              <button
                className="secondary-btn"
                type="button"
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
        <div className="register-header">
          <button type="button" className="back-button" onClick={handleGoBack}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Go Back</span>
          </button>

          <h1>Create account</h1>
        </div>

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
            <span>
              {selectedAccount === "Faculty" || selectedAccount === "Staff"
                ? "Employee ID"
                : "School ID"}{" "}
              {requiresIdNumber ? "" : "(optional)"}
            </span>
            <input
              type="text"
              name="id_number"
              value={form.id_number}
              onChange={handleChange}
              placeholder={
                selectedAccount === "Faculty" || selectedAccount === "Staff"
                  ? "Employee ID"
                  : "2026-00000"
              }
              disabled={!requiresIdNumber}
            />
          </label>

          <label className="field field-wide">
            <span>Email</span>
            <input
              type="email"
              name="registerEmail"
              value={form.registerEmail}
              onChange={handleChange}
              placeholder="example@gbox.adnu.edu.ph or example@gmail.com"
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
            <div className="password-field">
              <input
                type={passwordVisibility.register ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePassword("register")}
                aria-label={
                  passwordVisibility.register
                    ? "Hide password"
                    : "Show password"
                }
              >
                {passwordVisibility.register ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            </div>
          </label>

          <label className="field field-wide">
            <span>Confirm Password</span>
            <div className="password-field">
              <input
                type={passwordVisibility.confirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePassword("confirm")}
                aria-label={
                  passwordVisibility.confirm
                    ? "Hide password"
                    : "Show password"
                }
              >
                {passwordVisibility.confirm ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            </div>
          </label>
        </div>

        <h2 className="section-title">Account Type</h2>

        <div className="account-tabs">
          {accountTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={selectedAccount === type ? "active" : ""}
              onClick={() => handleAccountSelect(type)}
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
