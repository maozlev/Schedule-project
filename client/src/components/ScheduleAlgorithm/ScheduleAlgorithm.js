import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ScheduleAlgorithm.css";
import Button from "@mui/material/Button";

export default function ScheduleAlgorithm(props) {
  const activateAlgo = async (val) => {
    await axios
      .post("http://localhost:3001/api/activateAlgo/", {
        activate: true,
      })
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
    </div>
  );
}
