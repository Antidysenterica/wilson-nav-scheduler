import '../styles/ConfirmAppointment.css'

function ConfirmAppointment() {

    return (
        <div className="ConfirmAppointment">
            <h2 className="ConfirmAppointmentTitle">Confirm Details</h2>

            <p className="ConfirmAppointmentSubtitle">
                Enter the visitor and room details for the selected slot.
            </p>

            <div className="ConfirmGrid">
                <div className="ConfirmField">
                    <label>Date</label>
                    <div className="ConfirmValue">
                        June 20, 2026
                    </div>
                </div>

                <div className="ConfirmField">
                    <label>Name</label>
                    <div className="ConfirmValue">
                        Juan Dela Cruz
                    </div>
                </div>

                <div className="ConfirmField">
                    <label>Time</label>
                    <div className="ConfirmValue">
                        10:20 AM - 10:40 AM
                    </div>
                </div>

                <div className="ConfirmField">
                    <label>Room</label>
                    <div className="ConfirmValue">
                        DCS Office P200
                    </div>
                </div>
            </div>

            <div className="ConfirmField PurposeField">
                <label>Purpose</label>

                <div className="ConfirmValue">
                    Consultation
                </div>
            </div>

            <button
                type="button"
                className="BookScheduleButton"
            >
                Book a Schedule
            </button>
        </div>
    );
}

export default ConfirmAppointment;