import React, { useState,useEffect,useContext} from 'react'
import "./Popup.css";
import axios from 'axios'
import { adminContext } from '../App'


function Popup({ setpopupOpen }) {

    const [getdata, setGetdata] = useState([]);
    const [blacklist_name, setblacklistName] = useState([]);
    const { state, setState } = useContext(adminContext);

    useEffect(()=>{
        axios.get('http://localhost:5000/getblacklistname',)
        .then(res => setGetdata(res.data))
        .catch(err => console.log(err));
    })

    const handleblacklist = () =>{
        window.location.reload(false)
        axios.post('http://localhost:5000/getfnametobl',{
            blacklist_name: blacklist_name,
            adminID: state[0].adminID
        },[])
        .then(res => setblacklistName(res.data))
        .catch(err => console.log(err));
      }

    return (
        <div className="">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setpopupOpen(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>ยืนยันการระงับบัญชี</h1>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setpopupOpen(false);
                        }}
                        id="cancelBtn"
                    >
                        ยกเลิก
                    </button>
                    <button onClick={handleblacklist}>ยืนยัน</button>
                </div>
            </div>
        </div>
    );
}

export default Popup