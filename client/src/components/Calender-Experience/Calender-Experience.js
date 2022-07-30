import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./Calender-Experience.css"

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

export default function CustomizedTables(props) {
    return (
        <Calendar 
        localizer={localizer} events={props.events} startAccessor="start" endAccessor="end" view='month' views={['month']} style={{ height: 500 }} />
    );
  }

         