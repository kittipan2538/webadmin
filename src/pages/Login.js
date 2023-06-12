import React, { useState, useContext } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { adminContext } from "../App";

 
function Login() {
  let history = useHistory();
  const [emailAdmin, setemailAdmin] = useState('')
  const [passwordAdmin, setpasswordAdmin] = useState('')
  const [errors, serErrors] = useState([])

  const { state, setState } = useContext(adminContext);


  const validate = () => {
    const error = {};



    if (passwordAdmin.length < 8) {
      error.passwordAdmin = "อีเมลหรือพาสเวิร์ดไม่ถูกต้อง";
    } else {
      error.passwordAdmin = ""
    }

    return error;

  }

  function handgleSubmit(event) {
    event.preventDefault();
    const errors = validate();
    serErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert.apply("Done");
    }
    axios.post(`${process.env.REACT_APP_API}/admin`, { emailAdmin, passwordAdmin })
      .then(res => {
        if (res.data === false) {
          console.log('Wrong Email or password')
        } else {
          setemailAdmin(res.data)
          setState(res.data)
          console.log(setState)
          history.push('/approve')
          console.log('Login success')
        }
        return res
      })
      .then(res => console.log(res.data))
  }
  console.log(process.env.REACT_APP_API)

  return (
    <>

      <div className="App">
        <div className="loginContainer" >
          <br></br>
          <br></br>

          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <img className="center" src="https://sv1.picz.in.th/images/2023/06/12/IgzWhP.jpg" class="card-img-top" alt="..." height="180px" />
            </div>
            <div className="col-2"></div>
          </div>
          <br></br>
          <h1 className="ctext">Welcome Admin</h1>

          <div className="input-container was-validated mb-2">
            <label>Email </label>
            <input type="email" name="uname" required
              onChange={e => setemailAdmin(e.target.value)}
            />
            {errors.emailAdmin && <div className='error' >{errors.emailAdmin}</div>}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required
              onChange={e => setpasswordAdmin(e.target.value)}
            />
            {errors.passwordAdmin && <div className='error' >{errors.passwordAdmin}</div>}
          </div>



          <button onClick={handgleSubmit} className="loginBut">
            Login
          </button>


        </div>
      </div>
    </>
  );
}

export default Login;