import axios from "axios";
import "./MyExperiences.css"
import {useState, useEffect} from 'react'
import GuideTable from "../Guide-table/Guide-table.js"
import CalendarExperience from "../Calender-Experience/Calender-Experience.js"

function App({username}) {
    const [allEvents, setAllEvents] = useState([]);
    const [allContacts, setAllContacts] = useState([]);
    

    const getExperienceByID = () => {
        axios.get(`http://localhost:3001/api/MyExperienceCalander/${username}`) //Fetch the data from DB
            .then((response) => {
                const experiences = response.data.ev;
                const contacts = response.data.co;
                console.log("Experiences and contacts recived from DB");
                setAllEvents(experiences); // Set Experiences
                setAllContacts(contacts); // Set Contacts
            }).catch((err) => {
                // Handle errors
                console.log("ERROR: " + JSON.stringify(err.response.data))
            })
    }

    useEffect(() => {
        getExperienceByID();
    }, []);
       
    return (
        <div className="Experience-page background-image">
            <div className="Title">
                <h1>לוח התנסויות</h1>
            </div>
            <div className='calander-container' dir='rtl'>
                <CalendarExperience events={allEvents}/>
            </div>
            <div className='guide-table-container' dir='rtl'>
                <GuideTable contactsArray={allContacts}></GuideTable>
            </div>
        </div>
    );
}

export default App;