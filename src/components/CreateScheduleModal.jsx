import { useState } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import '../styles/CreateScheduleModal.css'

function CreateScheduleModal() {

    const [timeSlots, setTimeSlots] = useState([]);
    const [repeatOption, setRepeatOption] = useState("weekday");

    function handleAddSlot() {
        setTimeSlots([
            ...timeSlots,
            {
                start: "",
                end: ""
            }
        ])
    }

    function handleDeleteSlot(indexToDelete) {
        setTimeSlots(
            timeSlots.filter((slot, index) => index !== indexToDelete)
        );
    }

    function handleResetSlot() {
        setTimeSlots([])
    }

    function handleTimeChange(index, field, value) {
        const updatedSlots = [...timeSlots];

        updatedSlots[index][field] = value;

        setTimeSlots(updatedSlots);
    }

    function handleSave(e) {
        e.preventDefault();

        console.log({
            repeat: repeatOption,
            slots: timeSlots
        });
    }

    return (
        <div className="CreateScheduleOverlay">
            <div className="CreateScheduleModal">
                <div className="CreateScheduleHeader">
                    <h2>Available Time Slots</h2>
                </div>

                <div className="TimeSlotHeader">
                    <h3>Time Slots</h3>
                    <button type="button" id="addSlotButton" onClick={handleAddSlot}>+ <u>Add</u></button>
                </div>

                <div className="TimeSlots">
                    {timeSlots.map((slot, index) => (
                        <div key={index} className="TimeSlotRow">
                            <input
                                type="time"
                                value={slot.start}
                                onChange={(e) =>
                                    handleTimeChange(index, "start", e.target.value)
                                }
                            />

                            <span> - </span>

                            <input
                                type="time"
                                value={slot.end}
                                onChange={(e) =>
                                    handleTimeChange(index, "end", e.target.value)
                                }
                            />
                            <button type="button" id="deleteSlotButton" onClick={() => handleDeleteSlot(index)}><FaRegTrashCan /></button>
                        </div>
                    ))}
                </div>

                <form id="CreateScheduleForm" onSubmit={handleSave}>
                    <label htmlFor="repeatOption">Repeat</label>

                    <select id="repeatOption" value={repeatOption} onChange={(e) => setRepeatOption(e.target.value)}>
                        <option value="weekday">Every weekday</option>
                        <option value="none">Does not repeat</option>
                    </select>

                    <div className="FormButtons">
                        <button type="submit">Save Availability</button>
                        <button type="button" onClick={handleResetSlot}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateScheduleModal;