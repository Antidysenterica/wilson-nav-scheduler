import { Link } from "react-router-dom";
import "../styles/Requests.css";

function Requests({ requests, selectedRequestId, onReview }) {
  return (
    <div className="Requests">
      <div className="RequestsHeader">
        <div>
          <h2 className="RequestsTitle">Requests</h2>
          <p>Review pending requests and update their status.</p>
        </div>
      </div>

      <div className="RequestsContainer">
        {requests.map((request) => (
          <button
            key={request.id}
            type="button"
            className={`RequestCard ${selectedRequestId === request.id ? "is-selected" : ""}`}
            onClick={() => onReview(request.id)}
          >
            <div className="RequestDetails">
              <p className="RoomName">{request.room}</p>
              <p className="RequestSchedule">{request.time}, {request.date}</p>
              <p className="RequesterName">{request.name} / {request.requesterType}</p>
            </div>

            <span className={`RequestStatus ${request.status.toLowerCase()}`}>
              {request.status}
            </span>
          </button>
        ))}
      </div>

      <div className="RequestsFooter">
        <div>
          <h3 className="ScheduleTitle">Appointed Schedule/s</h3>
          <p>Adjust the available times shown to students and guests.</p>
        </div>

        <Link to="/time-slot-edit" className="EditScheduleButton">
          Edit Schedule
        </Link>
      </div>
    </div>
  );
}

export default Requests;
