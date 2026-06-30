import '../styles/Calendar.css'
import { useState } from 'react'
import { availableSchedules } from './dummyschedules.js'

function Calendar({ selectedDate, onDateSelect }) {

    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const calendarDays = [];
    const previousDays = [];
    const followingDays = [];

    for (let i = 0; i < firstDay; i++) {
        const previousDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            i - firstDay + 1
        ).getDate();
        previousDays.push(previousDate);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    const totalCells = 42;
    const nextDaysCount = totalCells - (previousDays.length + calendarDays.length);
    for (let day = 1; day <= nextDaysCount; day++) {
        const followingDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            day
        ).getDate();
        followingDays.push(followingDate);
    }

    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const days = [{ name: "Su" }, { name: "M" }, { name: "T" }, { name: "W" }, { name: "Th" }, { name: "F" }, { name: "Sa" }];

    function handleDateClick(day) {
        const fullDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );

        const dateKey = `${fullDate.getFullYear()}-${String(fullDate.getMonth() + 1).padStart(2, '0')}-${String(fullDate.getDate()).padStart(2, '0')}`;
        const slots = availableSchedules[dateKey] || [];
        if (slots.length === 0) {
            return;
        }

        onDateSelect(fullDate);
    }


    function handleNextMonth() {
        setCurrentDate(prevDate => new Date(
            prevDate.getFullYear(),
            prevDate.getMonth() + 1,
            1
        ));
    }

    function handlePreviousMonth() {
        setCurrentDate(prevDate => new Date(
            prevDate.getFullYear(),
            prevDate.getMonth() - 1,
            1
        ));
    }

    return (
        <div className="Calendar">
            <div className="calendarHeader">
                <button onClick={handlePreviousMonth}>&lt;</button>
                <h1>{month} {year}</h1>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>

            <div className="Days">

                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`Day ${index === 0 ? "Sunday" : ""}`}
                    >
                        {day.name}
                    </div>
                ))}
            </div>
            <div className="CalendarGrid">
                {previousDays.map((day, index) => (
                    <div key={index} className="DateCell previous">
                        {day}
                    </div>
                ))}
                {calendarDays.map((day, index) => {
                    const fullDate = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        day
                    );

                    const dateKey = `${fullDate.getFullYear()}-${String(fullDate.getMonth() + 1).padStart(2, '0')}-${String(fullDate.getDate()).padStart(2, '0')}`;
                    const hasSlots = (availableSchedules[dateKey] || []).length > 0;

                    const isToday =
                        day === todayDate &&
                        currentDate.getMonth() === todayMonth &&
                        currentDate.getFullYear() === todayYear;

                    const isSelected =
                        selectedDate &&
                        day === selectedDate.getDate() &&
                        currentDate.getMonth() === selectedDate.getMonth() &&
                        currentDate.getFullYear() === selectedDate.getFullYear();

                    return (
                        <div
                            key={index}
                            className={`DateCell ${isToday ? "today" : ""} ${hasSlots ? "available" : ""} ${isSelected ? "selected" : ""}`}
                            onClick={() => handleDateClick(day)}
                        >
                            <span className="DateNumber">{day}</span>
                        </div>
                    );
                })}
                {followingDays.map((day, index) => (
                    <div key={index} className="DateCell previous">
                        {day}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar;
