import { useEffect, useState } from "react";
import "../styles/FacultyAppointments.css";

function FacultyAppointments({ request, onDecision }) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    setReason(request?.note || "");
  }, [request?.id, request?.note]);

  if (!request) {
    return (
      <div className="FacultyAppointments empty-review-card">
        <h2>Appointment Review</h2>
        <p>Select a request to review its details.</p>
      </div>
    );
  }

  function handleDecision(status) {
    onDecision(request.id, status, reason);
  }

  return (
    <div className="FacultyAppointments">
      <div className="ReviewHeader">
        <div>
          <span>Appointment Review</span>
          <h2>{request.name}</h2>
        </div>

        <strong className={`ReviewStatus ${request.status.toLowerCase()}`}>
          {request.status}
        </strong>
      </div>

      <div className="AppointmentDetails">
        <p><strong>Details</strong></p>
        <p><span>Room:</span> {request.room}</p>
        <p><span>Date:</span> {request.date}</p>
        <p><span>Time:</span> {request.time}</p>
        <p><span>Purpose:</span> {request.purpose}</p>
        <p><span>Contact:</span> {request.contact}</p>
        <p><span>Requester Type:</span> {request.requesterType}</p>
      </div>

      <label htmlFor="reason">Reason or note</label>
      <textarea
        id="reason"
        rows="4"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        placeholder="Add a reason for rejection or a note for approval."
      />

      <div className="DecisionButtons">
        <button
          type="button"
          className="RejectButton"
          onClick={() => handleDecision("Rejected")}
        >
          Reject
        </button>
        <button
          type="button"
          className="ApproveButton"
          onClick={() => handleDecision("Approved")}
        >
          Approve
        </button>
      </div>

      <button
        type="button"
        className="SubmitButton"
        onClick={() => handleDecision(request.status)}
      >
        Save Note
      </button>
    </div>
  );
}

export default FacultyAppointments;
