import '../styles/TimeSlotSelection.css'
import { availableSchedules } from "../data/schedules.js";
import { useState } from 'react';

function TimeSlotSelection({ selectedDate, onClose }) {

    const dateKey = selectedDate
        ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
        : null;
    const slots = dateKey ? (availableSchedules[dateKey] || []) : [];

    const [selectedDateAndTime, setSelectedDateAndTime] = useState(null);

    const [selectedSlot, setSelectedSlot] = useState(null);

    function handleTimeSlotClick(slot) {
        setSelectedSlot(slot);

        setSelectedDateAndTime({
            date: selectedDate,
            startTime: slot.startTime,
            endTime: slot.endTime
        });
    }

    return (
        <div className="TimeSlotModal">
            <div className="TimeSlotHeader">
                <h1>Available Slots</h1>
                <button type="button" onClick={onClose}>✕</button>
            </div>

            <div className="TimeSlots">
                {slots.map((slot, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`TimeSlotButton ${selectedSlot === slot ? "selected" : ""
                            }`}
                        onClick={() => handleTimeSlotClick(slot)}
                    >
                        <span>
                            {slot.startTime} - {slot.endTime}
                        </span>

                        <span
                            className={`SlotStatus ${slot.status === "Pending"
                                ? "pending"
                                : "available"
                                }`}
                        >
                            {slot.status}
                        </span>
                    </button>
                ))}
            </div>

            <form className="AppointmentForm" onSubmit={(e) => { e.preventDefault(); }}>
                <div className="AppointmentFormScroll">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder='Name' id="name" />
                    <label htmlFor="purpose">Purpose</label>
                    <input type="text" placeholder='Purpose' id="purpose" />
                    <label htmlFor="contactnumber">Contact Number</label>
                    <input type="text" placeholder='Contact Number' id="contactnumber" />
                </div>
                <button type="submit">Request Appointment</button>
            </form>
        </div>
    )
};

export default TimeSlotSelection;