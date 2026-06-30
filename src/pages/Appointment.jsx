import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState } from 'react'
import Calendar from "../components/Calendar";
import TimeSlotSelection from "../components/TimeSlotSelection";

function Appointment() {
  return (
    <div>
      <Calendar />
      <TimeSlotSelection />
      
      
      <h1>Book Appointment</h1>

      <ul>
      	<li><Link to="/map">Map</Link></li>
      	<li><Link to="/appointment">Schedule Appointment</Link></li>
      	<li><Link to="/manage-appointment">Manage Appointment</Link></li>
      	<li><Link to="/profile">User Profile</Link></li>
      </ul>
      
      <form>
        <input
          type="text"
          placeholder="Purpose"
        />

        <button>
          Submit
        </button>
      </form>
      
      <Outlet />
      <Outlet />
      
    </div>
  );
}

export default Appointment;
