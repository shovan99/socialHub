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
          className="btn-floating btn-large waves-effect waves-light #7986cb indigo lighten-2"> <i className="material-icons">exit_to_app</i> </button></li>
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
        <div class="nav-wrapper #9fa8da indigo lighten-3">
          <Link to={state?"/":"/login"} className="brand-logo left" style={{ marginLeft: "20px" , color: "#120E43" }}>socialHub</Link>
          <ul id="nav-mobile" className="right">
              {renderList()}
          </ul>
        </div>
   </nav>
   </div>
    )
}


export default Navbar