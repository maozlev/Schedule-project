import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ScheduleAlgorithm.css";
import Button from "@mui/material/Button";

export default function ScheduleAlgorithm(props) {
  const [isScheduled, setIsScheduled] = useState(false)

  const activateAlgo = async (val) => {
    await axios
      .post("http://localhost:3001/api/activateAlgo/", {
        activate: true,
      }).then(data => {
        setIsScheduled(data.data)
      }).catch(err => {
        console.log(err)
        alert("שגיאה, נא לפנות לצוות הפיתוח!")
      })
  };

  const openInNewTab = () => {
    window.open("https://docs.google.com/spreadsheets/d/1EOjxadTgr136HY5o7mmft3whIGoIVxE2O595V_hn1lY/edit#gid=0", '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="div btn">
      <Button
        className="btn schedule"
        variant="contained"
        component="label"
        onClick={() => activateAlgo()}
      >
        לחץ כאן להפעלת אלגוריתם השיבוץ
      </Button>
      {isScheduled && <div className="btn-toSpreadsheet">
        <Button className="btn schedule" 
          // variant="contained"
          // component="label"
          onClick={() => openInNewTab()}>
          לחץ כאן למעבר לתוצאות השיבוץ
        </Button>
      </div>}
    </div>
  );
}
