import React, { useContext } from 'react'
import { Link , useHistory } from "react-router-dom"

import { UserContext } from "../App"

const Navbar = () => {
    const {state , dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
      if( state ) {
        return [
          <li> <Link to="/createpost"> Create Post </Link> </li>,
          <li><Link to="/profile">Profile</Link></li>,
          <li><button onClick={() => {
          localStorage.clear()
          dispatch({ type: "CLEARR" })
          history.push("/login")}}
          className="waves-effect waves-light btn"> Logout </button></li>
        ]
      }
      else {
        return [
          <li><Link to="/signup">Signup</Link></li>,
          <li><Link to="/login">Login</Link></li>
        ]
      }
    }
    return (
    <div className="navbar-fixed">
    <nav>
        <div class="nav-wrapper #8c9eff indigo accent-1">
          <Link to={state?"/":"/login"} className="brand-logo left">Logo</Link>
          <ul id="nav-mobile" className="right">
              {renderList()}
          </ul>
        </div>
   </nav>
   </div>
    )
}


export default Navbar