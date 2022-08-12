import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./DownloadDocuments.css"

export default function DownloadDocuments(props){
    const [AllDocs,setAllDocs] = useState(false)
    const [AllUsers,setAllUsers] = useState(false)

    async function getAllDocuments() {
        await axios.get(`http://localhost:3001/api/getAllDocuments`) //Fetch the data from DB
            .then((response) => {
                setAllDocs(response.data.AllDocs)
            }).catch((err) => {
                // Handle errors
                console.log("ERROR: " + JSON.stringify(err.response.data))
            })
    }
   
    async function getAllUsers(){
        await axios.get(`http://localhost:3001/api/getAllUsers`) //Fetch the data from DB
        .then((response) => {
            setAllUsers(response.data.AllUsers)
        }).catch((err) => {
            // Handle errors
            console.log("ERROR: " + JSON.stringify(err.response.data))
            return false
        })
    }

    const [canBuild,setCanBuild] = useState(false)

    useEffect(async ()=>{
        try{
             await getAllDocuments()
             await getAllUsers()
             setCanBuild(true)
        }catch (err){
            console.log("ERROR " + JSON.stringify(err.response.data))
        } 
    },[])
    const [AllData,setAllData] = useState(null)
    var DocsUsersList = []

    function buildData(){
        if(canBuild){
            AllDocs.forEach((doc) => {
                let currUser =  AllUsers.find(usr => {
                    return usr.UserName === doc.UserName
                })
                DocsUsersList.push({
                    Name : currUser.FirstName + " " + currUser.LastName,
                    ID : currUser.id,
                    Year : currUser.year,
                    Subject : doc.Subject,
                    objectId : doc._id,
                    Data : doc.Data
                })               
            })
            setAllData(DocsUsersList)
        }
    }

    useEffect(async ()=>{
        try{
            buildData()
        }catch (err){
            console.log("ERROR " + JSON.stringify(err.response.data))
        } 
    },[canBuild])

    const [option,setOption] = useState(null)
    useEffect(async ()=>{
        setDataToShow(null)
        setStudentID("")
        setYear(null)
    },[option])
    const [year,setYear] = useState(null)
    const [studentID,setStudentID] = useState("")
    const [dataToShow,setDataToShow] = useState(null)

    function setData(){
        var data = AllData.filter((doc) => {return doc.ID === studentID})
        setDataToShow(data)
    }

    function fetchChoice() {
        switch (option) {
            case "AllYear":
                return (
                    <select onChange={(e) => setYear(e.target.value)}>
                        <option value="Default" selected disabled hidden>אנא בחר שנתון</option>
                        <option value="1">א</option>
                        <option value="2">ב</option>
                        <option value="3">ג</option>
                        <option value="4">ד</option>
                    </select>
                );
            case "ByStudent":
                return (
                    <div id='bySpecificUser'>
                        <label for="students_id">הכנס תעודת זהות סטודנט</label>
                        <input type="text" id="students_id" name="students_id" 
                                onChange={(e)=>{setStudentID(e.target.value)}}/>
                        <button onClick={()=>setData()}>הצג</button>
                    </div>
                    );
            default:
                return;
        }
    }
    
    function fetchData() {
        if(AllData){
            if(year){
                let data = AllData.filter((doc) => {return doc.Year === year})
                setDataToShow(data)
                return showResults()
            } else if (studentID){
                return showResults()
            } else {return(<h2>Please Select an option above</h2>)}
        }
    }

    useEffect(async ()=>{
        fetchData()
    },[year,studentID])
    
    function _arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return binary;
    }
    
    async function downloadfile(objectId,ID){
        await axios.get(`http://localhost:3001/api/downloadDoc?oid=${objectId}`) //Fetch the data from DB
        .then((response) => {
            const base64 = _arrayBufferToBase64(response.data.Data.data).split("base64,")
            const bytes = atob(base64[1]);
            let length = bytes.length;
            let out = new Uint8Array(length);
    
            while (length--) {
                out[length] = bytes.charCodeAt(length);
            }
            const url = window.URL.createObjectURL(
                new Blob([out], { type: 'application/pdf' }),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
            'download',
            `${response.data.Subject}`+"_"+`${ID}`+`.pdf`,
            );

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
            });
        }

    function showResults(){
        if(dataToShow && dataToShow.length>0){
            return(
                <table>
                    <tr className="header-row">
                        <th>שם הסטודנט</th>
                        <th>ת.ז.</th>
                        <th>שנה</th>
                        <th>נושא הקובץ</th>
                        <th>הורדה</th>
                    </tr>
                    {dataToShow.map((doc) => (
                        <tr className="content-row">
                            <td>{doc.Name}</td>
                            <td>{doc.ID}</td>
                            <td>{doc.Year}</td>
                            <td>{doc.Subject}</td>
                            <td>
                                {/* <a download={{doc.Subject}} href={{pdfData}} title='Download pdf document' /> */}
                                <button onClick={()=>{downloadfile(doc.objectId,doc.ID)}}>הורדה</button>
                            </td>
                        </tr>
                    ))}
                </table>
            )
        }else{ return <h2>אין נתונים</h2>}
    }
    return(
        <div>
            <div className="collect-user-info">
                <select id="optionSelect" onChange={(e) => {setOption(e.target.value)}}>
                <option value="Default" selected disabled hidden>אנא בחר אפשרות</option>
                <option value="ByStudent">לפי סטודנט</option>
                <option value="AllYear">לפי שנתון</option>  
                </select>
                <div className="Choices">
                    {fetchChoice()}
                </div>
                <div className="Data">
                    {showResults()}
                </div>    
            </div>
        </div>
    )
}