import '../styles/Requests.css'
import { requests } from '../data/requests.js'

function Requests({ onReview }) {

    return (
        <div className="Requests">
            <h2 className="RequestsTitle">Requests</h2>
            <div className="RequestsContainer">
                {requests.map((request, index) => (
                    <div key={index} className="RequestCard">
                        <div className="RequestDetails">
                            <p className="RoomName">{request.room}</p>
                            <p className="RequestSchedule">{request.time}, {request.date}</p>
                        </div>
                        <button type="button" className="ReviewButton" onClick={() => onReview(request)}>Review</button>
                    </div>
                ))}
            </div>
            <h3 className="ScheduleTitle">Appointed Schedule/s</h3>
            <button type="button" className="EditScheduleButton">Edit Schedule</button>
        </div>
    );
}

export default Requests;