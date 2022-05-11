import axios from "axios";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
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


function App({username}) {
    const [allEvents, setAllEvents] = useState([]);

    const getExperienceByID = () => {
        axios.get(`http://localhost:3001/api/MyExperience/${username}`)
            .then((response) => {
                const experience = response.data;
                console.log("Data recived")
                setAllEvents(experience);
            }).catch((err) => {
                // Handle errors
                console.log("ERROR: " + JSON.stringify(err.response.data))
            })
    }

    // function handleAddEvent() {
    //     setAllEvents([...allEvents, newEvent]);
    // }
    useEffect(() => {
        getExperienceByID();
    }, []);

    return (
        <div className="App">
            <h1>לוח התנסויות</h1>
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
 * 1. Create fucntion that collect experiences for each student
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
