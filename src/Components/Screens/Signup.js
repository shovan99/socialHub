import React , { useState } from "react";
import { Link , useHistory } from "react-router-dom"

import M from "materialize-css"

const Signup = () => {
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");
  const history = useHistory()
  const postData = () => {
    if( password !== confirmPassword ) {
        M.toast({ html: "Passwords Do Not Match" })
        return;
    }
    fetch("/signup" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    }).then(res => res.json())
    .then(data => {
      if( data.error ) {
        M.toast({ html: data.error })
      }
      else {
        M.toast({ html: data.message })
        history.push("/login")
      }
    })
  }
  return (
    <div className="card card_signup #757575 grey darken-1 container">
      <div className="auth_card row container">
      <h2 className="content"> Signup Here </h2>
          <div className="row input_field">
            <div className="input-field col s12">
              <input
                id="email"
                placeholder="Enter Your Name Here"
                type="text"
                className="validate"
                value={name}
                onChange={e => setName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="row input_field">
            <div className="input-field col s12">
              <input
                id="email"
                placeholder="Enter Your Email Here"
                type="email"
                className="validate"
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="row input_field">
            <div className="input-field col s12">
              <input
                id="email"
                placeholder="Enter Your Password Here"
                type="password"
                className="validate"
                value={password}
                onChange={e=> setPassword(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="row input_field">
            <div className="input-field col s12">
              <input
                id="email"
                placeholder="Repeat Your Password Again"
                type="password"
                className="validate"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              ></input>
            </div>
          </div>
        <button onClick={() => postData()} className="waves-effect waves-light btn"> Signup </button>
          <br/>
          <small style={{ fontSize: "12px" }}> Already Have An Account? <Link to="/login"> Login Here </Link> </small>
      </div>
    </div>
  );
};

export default Signup;