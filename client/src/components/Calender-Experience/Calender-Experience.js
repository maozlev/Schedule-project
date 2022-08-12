import { Calendar, momentLocalizer  } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./Calender-Experience.css"
import moment from "moment"
import 'moment/locale/he'; 
const localizer = momentLocalizer(moment) 


// const locales = {
//     "he": require("date-fns/locale/he"),
// };

export default function CustomizedTables(props) {
    return (
        <Calendar 
        localizer={localizer} 
        events={props.events} 
        startAccessor="start" 
        endAccessor="end" 
        views={['month']} 
        style={{ height: 500 }}
        messages={{
            next: "חודש הבא",
            previous: "חודש קודם",
            today: "היום",
          }}
         />
    );
  }

         