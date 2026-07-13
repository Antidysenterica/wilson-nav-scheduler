import { useState } from "react";
import { Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import "../styles/CreateScheduleModal.css";

const initialSlots = [
  { start: "09:00", end: "09:20" },
  { start: "09:40", end: "10:00" },
];

function CreateScheduleModal({ onSave }) {
  const [scheduleDate, setScheduleDate] = useState("2026-07-11");
  const [room, setRoom] = useState("DCS Office P200");
  const [timeSlots, setTimeSlots] = useState(initialSlots);
  const [repeatOption, setRepeatOption] = useState("weekday");
  const [message, setMessage] = useState("");

  function handleAddSlot() {
    setTimeSlots([
      ...timeSlots,
      {
        start: "",
        end: "",
      },
    ]);
  }

  function handleDeleteSlot(indexToDelete) {
    setTimeSlots(
      timeSlots.filter((slot, index) => index !== indexToDelete)
    );
  }

  function handleResetSlot() {
    setScheduleDate("2026-07-11");
    setRoom("DCS Office P200");
    setRepeatOption("weekday");
    setTimeSlots(initialSlots);
    setMessage("");
  }

  function handleTimeChange(index, field, value) {
    const updatedSlots = [...timeSlots];

    updatedSlots[index][field] = value;

    setTimeSlots(updatedSlots);
  }

  function handleSave(e) {
    e.preventDefault();

    const hasIncompleteSlot = timeSlots.some((slot) => !slot.start || !slot.end);

    if (!scheduleDate || !room || timeSlots.length === 0 || hasIncompleteSlot) {
      setMessage("Complete the date, room, and all slot times before saving.");
      return;
    }

    const payload = {
      date: scheduleDate,
      room,
      repeat: repeatOption,
      slots: timeSlots,
    };

    onSave?.(payload);
    setMessage("Available time slots saved.");
  }

  return (
    <section className="CreateScheduleModal">
      <div className="CreateScheduleHeader">
        <h2>Available Time Slots</h2>
        <p>Add, update, or delete the time windows shown in the scheduler.</p>
      </div>

      <form id="CreateScheduleForm" onSubmit={handleSave}>
        <label htmlFor="scheduleDate">Date</label>
        <input
          type="date"
          id="scheduleDate"
          value={scheduleDate}
          onChange={(event) => setScheduleDate(event.target.value)}
        />

        <label htmlFor="room">Room</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(event) => setRoom(event.target.value)}
        />

        <label htmlFor="repeatOption">Repeat</label>
        <select
          id="repeatOption"
          value={repeatOption}
          onChange={(event) => setRepeatOption(event.target.value)}
        >
          <option value="weekday">Every weekday</option>
          <option value="weekly">Every week</option>
          <option value="none">Does not repeat</option>
        </select>

        <div className="AvailabilitySlotHeader">
          <h3>Time Slots</h3>
          <button type="button" id="addSlotButton" onClick={handleAddSlot}>
            <Plus size={14} aria-hidden="true" />
            <span>Add</span>
          </button>
        </div>

        <div className="AvailabilitySlots">
          {timeSlots.map((slot, index) => (
            <div key={`${index}-${slot.start}-${slot.end}`} className="TimeSlotRow">
              <input
                aria-label={`Slot ${index + 1} start time`}
                type="time"
                value={slot.start}
                onChange={(e) =>
                  handleTimeChange(index, "start", e.target.value)
                }
              />

              <span>-</span>

              <input
                aria-label={`Slot ${index + 1} end time`}
                type="time"
                value={slot.end}
                onChange={(e) =>
                  handleTimeChange(index, "end", e.target.value)
                }
              />
              <button
                type="button"
                id="deleteSlotButton"
                onClick={() => handleDeleteSlot(index)}
                aria-label={`Delete slot ${index + 1}`}
              >
                <Trash2 size={15} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        <div className="FormButtons">
          <button type="submit">
            <Save size={15} aria-hidden="true" />
            <span>Save Availability</span>
          </button>
          <button type="button" onClick={handleResetSlot}>
            <RotateCcw size={15} aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>
      </form>

      {message && <p className="ScheduleFeedback">{message}</p>}
    </section>
  );
}

export default CreateScheduleModal;
