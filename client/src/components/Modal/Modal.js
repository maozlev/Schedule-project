import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from "axios"
import { Link, useNavigate} from 'react-router-dom';


export default function Modal(props) {
  const [modal, setModal] = useState(false);

  const [isinDB, setisinDB] = useState(null);
  useEffect(() => {
    userIsInDB();
    }, []);
    
  function userIsInDB() {
    axios.get(`http://localhost:3001/api/checkisExist/${props.username}`)
        .then((response) => {
          console.log("DATA IS : " + response.data)
          setisinDB(response.data);
        }).catch((err) => {
            // Handle errors
            console.log("ERROR: " + JSON.stringify(err.response.data))
        })
  }

  const toggleModal = () => {
    setModal(!modal);
  };
  
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {/* <button onClick={toggleModal} className="btn-modal">
        Open
      </button> */}

      {!isinDB && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>עדכן את פרטיך</h2>
            <p>
              עדכן את פרטיך
            </p>
            <Link to="/new_user">
                <button>
                    לחץ כאן      
                </button>
            </Link>
          </div>
        </div>
      )}
      {/* <p>usanaci sint rerum laborum placeat adipisci doloribus! Deserunt, quisquam molestiae.</p> */}
    </>
  );
}