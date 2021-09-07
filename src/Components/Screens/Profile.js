import React , { useState , useEffect ,useContext } from "react";
import { UserContext } from "../../App"

const Profile = () => {
  const [post , setPostt] = useState([])
  const {state , dispatch} = useContext(UserContext)
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => 
      res.json()).then(data => setPostt(data.myPost))
  },[])
  return (
    <div className="container">
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
          <h4> {state ? state.name : "loading"} </h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6> 20 Posts </h6>
            <h6> 20 Followers </h6>
            <h6> 20 Following </h6>
          </div>
        </div>
      </div>
      <div className="gallery">
      { post.map(data => (
        
        <img src={data.photo} className="item" />
      )) }
      </div>
    </div>
  );
};

export default Profile;
