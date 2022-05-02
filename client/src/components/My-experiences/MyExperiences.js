import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Local area of the calender
const locales = {
    "he": require("date-fns/locale/he"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022, 4, 3),
        end: new Date(2022, 4, 3),
    },
    {
        title: "Vacation",
        start: new Date(2022, 4, 7),
        end: new Date(2022, 4, 10),
    },
    {
        title: "Conference",
        start: new Date(2022, 4, 20),
        end: new Date(2022, 4, 23),
    },
];

function App() {
    // const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    // function handleAddEvent() {
    //     setAllEvents([...allEvents, newEvent]);
    // }

    return (
        <div className="App">
            <h1>Calendar</h1>
            {/* <h2>Add New Event</h2> */}
            {/* <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div> */}
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default App;


/**
 * ###################           TODO's         ################
 * 
 *          yosef - 3/5/22
 * 1. Create fucntion that collect ecperiences for each student
 *
 * 2. Design this page
 * 
 * 3. Try to add hours for each experience 
 * 
 * 4. Organized it in the database
 * 
 * 
 * 
 */