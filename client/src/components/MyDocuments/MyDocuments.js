import axios from "axios";
import "./MyDocuments.css"
import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom';     
import Button from '@mui/material/Button';

function MyDocuments({ username }) {
    const [AllDocs, setAllDocs] = useState(false)
    const [canBuild, setCanBuild] = useState(false)
    const [AllData, setAllData] = useState(null)

    const getAllDocuments = async function () {
        await axios.get(`http://localhost:3001/api/getAllDocumentsByID?un=${username}`) //Fetch the data from DB
            .then((response) => {
                setAllDocs(response.data.AllDocs)
            }).catch((err) => {
                // Handle errors
                console.log("ERROR: " + JSON.stringify(err.response.data))
            })
    }

    useEffect(async () => {
        try {
            await getAllDocuments()
            setCanBuild(true)
        } catch (err) {
            console.log("ERROR " + JSON.stringify(err.response.data))
        }
    }, [])


    var DocsUsersList = []

    const buildData = function () {
        if (canBuild) {
            AllDocs.forEach((doc) => {
                DocsUsersList.push({
                    Subject: doc.Subject,
                    objectId: doc._id,
                    Data: doc.Data
                })
            })
            setAllData(DocsUsersList)
        }
    }

    useEffect(async () => {
        try {
            buildData()
        } catch (err) {
            console.log("ERROR " + JSON.stringify(err.response.data))
        }
    }, [canBuild])


    function _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return binary;
    }

    async function downloadfile(objectId, ID) {
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
                    `${response.data.Subject}` + "_" + `${ID}` + `.pdf`,
                );

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    }

    function showResults() {
        if (AllData && AllData.length > 0) {
            return (
                <table>
                    <tr className="header-row">
                        <th>מס'</th>
                        <th>נושא הקובץ</th>
                        <th>הורדה</th>
                    </tr>
                    {AllData.map((doc,idx) => (
                        <tr className="content-row">
                            <td>{idx+1}</td>
                            <td>{doc.Subject}</td>
                            <td>
                                {/* <a download={{doc.Subject}} href={{pdfData}} title='Download pdf document' /> */}
                                <button onClick={() => { downloadfile(doc.objectId, "Mine") }}>הורדה</button>
                            </td>
                        </tr>
                    ))}
                </table>
            )
        } else { return <h2>אין נתונים</h2> }
    }

    useEffect(() => {
        showResults()
    }, [AllData])

    return (
        <div dir="rtl" className="background-image">
            <div className="title">המסמכים שלי</div>
            <Link to="/">
                    <Button variant="contained" className='btn-return-hompage' style={{ float: 'left', margin: ' 5px',}}>
                        חזור לעמוד הבית    
                    </Button>
            </Link>
            <div className="myDocs">
                {AllData && <div className="Data">
                    {showResults()}
                </div>}
            </div>
        </div>
    )
}

export default MyDocuments;