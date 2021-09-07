import React , { useState , useContext } from "react";
import { Link , useHistory } from "react-router-dom"

import M from "materialize-css"

import { UserContext } from "../../App"

const Login = () => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("")

  const { state , dispatch } = useContext(UserContext)
  const history = useHistory()

  const postData = () => {
    fetch("/signin" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json())
    .then(data => {
      if( data.error ) {
        M.toast({ html: data.error , classes: "rounded" })
      }
      else {
        localStorage.setItem("jwt" , data.token)
        localStorage.setItem("user" , JSON.stringify(data.user))
        dispatch({ type: "USER" , payload: data.user })
        M.toast({ html: "Logged In" , classes: "rounded #2e7d32 green darken-3" })
        history.push("/")
      }
    })
  }
  return (
    <div className="card_login #7986cb indigo lighten-2 container">
      <div className="auth_card row container">
      <h2 className="content"> Login Here </h2>
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
                onChange={e => setPassword(e.target.value)}
              ></input>
            </div>
          </div>
          <button className="waves-effect waves-light btn" onClick={ () => postData() }> Login </button><br/>
          <small style={{ fontSize: "12px" }}> Don't Have An Account? <Link to="/signup"> <span style={{ color: "blue" }}>Signup Here</span> </Link> </small>
          {/* <a class="waves-effect waves-light btn">Signup</a> */}
      </div>
    </div>
  );
};

export default Login;
