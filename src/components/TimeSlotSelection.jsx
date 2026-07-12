import "../styles/TimeSlotSelection.css";
import { availableSchedules } from "./dummyschedules.js";
import { useEffect, useMemo, useState } from "react";

const initialRequest = {
  name: "",
  purpose: "",
  contactNumber: "",
};

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function TimeSlotSelection({ selectedDate, onClose, onRequest }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [request, setRequest] = useState(initialRequest);
  const [message, setMessage] = useState("");

  const dateKey = selectedDate ? getDateKey(selectedDate) : null;
  const slots = useMemo(
    () => (dateKey ? availableSchedules[dateKey] || [] : []),
    [dateKey]
  );

  useEffect(() => {
    setSelectedSlot(null);
    setMessage("");
  }, [dateKey]);

  function handleTimeSlotClick(slot) {
    if (slot.status !== "Available") {
      setMessage("This time slot is pending review and cannot be booked.");
      return;
    }

    setSelectedSlot(slot);
    setMessage("");
  }

  function handleChange(event) {
    setRequest({
      ...request,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedDate || !selectedSlot) {
      setMessage("Choose an available time slot first.");
      return;
    }

    if (!request.name || !request.purpose || !request.contactNumber) {
      setMessage("Complete the request details before submitting.");
      return;
    }

    const appointmentRequest = {
      date: formatDate(selectedDate),
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      ...request,
    };

    onRequest?.(appointmentRequest);
    setRequest(initialRequest);
    setSelectedSlot(null);
    setMessage("Appointment request sent for approval.");
  }

  if (!selectedDate) {
    return (
      <div className="TimeSlotModal empty-slot-panel">
        <div className="TimeSlotHeader">
          <h2>Available Slots</h2>
        </div>
        <p className="SlotEmptyText">
          Select a highlighted date on the calendar to view available appointment slots.
        </p>
      </div>
    );
  }

  return (
    <div className="TimeSlotModal">
      <div className="TimeSlotHeader">
        <div>
          <span>Selected Date</span>
          <h2>{formatDate(selectedDate)}</h2>
        </div>

        {onClose && (
          <button type="button" onClick={onClose} aria-label="Close available slots">
            X
          </button>
        )}
      </div>

      <div className="AppointmentSlotList" aria-label="Available appointment slots">
        {slots.map((slot) => (
          <button
            key={`${slot.startTime}-${slot.endTime}`}
            type="button"
            disabled={slot.status !== "Available"}
            className={`TimeSlotButton ${selectedSlot === slot ? "selected" : ""}`}
            onClick={() => handleTimeSlotClick(slot)}
          >
            <span>
              {slot.startTime} - {slot.endTime}
            </span>

            <span
              className={`SlotStatus ${slot.status === "Pending" ? "pending" : "available"}`}
            >
              {slot.status}
            </span>
          </button>
        ))}
      </div>

      <form className="AppointmentForm" onSubmit={handleSubmit}>
        <div className="AppointmentFormScroll">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            value={request.name}
            onChange={handleChange}
          />

          <label htmlFor="purpose">Purpose</label>
          <input
            type="text"
            placeholder="Purpose"
            id="purpose"
            name="purpose"
            value={request.purpose}
            onChange={handleChange}
          />

          <label htmlFor="contactnumber">Contact Number</label>
          <input
            type="text"
            placeholder="Contact Number"
            id="contactnumber"
            name="contactNumber"
            value={request.contactNumber}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={!selectedSlot}>
          Request Appointment
        </button>
      </form>

      {message && <p className="SlotFormMessage">{message}</p>}
    </div>
  );
}

export default TimeSlotSelection;
