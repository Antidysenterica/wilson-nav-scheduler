import '../styles/FacultyAppointments.css'

function FacultyAppointments({ request }) {

    return (
        <div className="FacultyAppointments">
            <h1>Appointed Schedule</h1>
            <div className="AppointmentDetails">
                <p><strong>Details:</strong></p>
                <p>Building Name</p>
                <p>Date: {request.date}</p>
                <p>{request.time}</p>
                <p>{request.room}</p>
                <p>{request.purpose}</p>
            </div>
            <div className="DecisionButtons">
                <button className="RejectButton">Reject</button>
                <button className="ApproveButton">Approve</button>
            </div>
            <label htmlFor="reason">Reason for cancellation</label>

            <input type="text" id="reason" placeholder="Reasons for cancellation" />
            <button className="SubmitButton">Submit</button>

        </div>
    );
}

export default FacultyAppointments;