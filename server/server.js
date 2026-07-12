require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointment");
const timeSlotRoutes = require("./routes/timeslots");

// API Endpoints
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/timeslots", timeSlotRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Wilson Appointment Scheduler Backend is running!");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
