import React , { useState , useEffect ,useContext } from "react";
import { UserContext } from "../../App"

import { useParams } from "react-router-dom"

const Profile = () => {
  const [data, settData] = useState(null)
  const [spin , setsSpin] = useState(true)
  const {state , dispatch} = useContext(UserContext)

  const { userId } = useParams();
  

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => 
      res.json()).then(result => {
          settData(result)
          setsSpin(false)
      })
  },[])
  return (
    <div className="container">
    { spin == true ? (
        <div class="preloader-wrapper small active">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
    ) : (
        <>
        <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "2px solid gray",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" , marginBottom: "20px" }}
            src="https://images.unsplash.com/photo-1628628572664-b8ccc4ed43c7?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1MHx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div>
        <div className="collapsible">
          <p className="collapsible-header" style={{ padding: "12px" , margin: "0px" }}> <i className="material-icons">person_pin</i>{ data.user.name } </p>
          {/* <p className="collapsible-header"> { data.user.email } </p> */}
        </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
            className="collapsible"
          >
            <h6 className="collapsible-header" style={{ padding: "12px" , margin: "0px" }}> { data.post.length } Posts </h6>
            <h6 className="collapsible-header" style={{ padding: "12px" , margin: "0px" }}> 20 Followers </h6>
            <h6 className="collapsible-header" style={{ padding: "12px" , margin: "0px" }}> 20 Following </h6>
          </div>
        </div>
      </div>
      <div className="gallery">
      { data.post.map(data => (
        
        <img src={data.photo} className="item" />
      )) }
      </div>
      </>
    ) }
      
    </div>
  );
};

export default Profile;
