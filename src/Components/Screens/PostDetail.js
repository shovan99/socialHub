import React , { useState , useEffect } from "react";
import { useParams } from "react-router-dom"

import Spinner from "../Spinner"

const PostDetail = () => {
    const [post , setPost] = useState([])
    const [spin , setsSpin] = useState(true)
    const params = useParams();
    useEffect(() => {
        const fetchDta = async() => {
            console.log(params)
            await fetch(`/postbyid/${params.postId}` , {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then(res => res.json()).then(result => {
                return (
                setPost(result),
                setsSpin(false)
                )
            })
        }
        fetchDta()
    },[])
  return (
<>

    { spin == true ? (
            <Spinner/>
    ) : (
        <div className="container">
    <div className="container" style={{ margin: "40px auto", display: "flex" }}>
      <div>
        <img
          src={post.photo}
          style={{ maxWidth: "80%", maxHeight: "400px", border: "2px solid gray" , borderRadius: "20px" }}
        />
      </div>
      <div>
        <ul class="collapsible">
          <li>
            <div class="collapsible-header">
              <i class="material-icons">person_pin</i>
              Posted By: { post.postedBy.name }
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="material-icons">thumb_up</i>
              Total  <span className="badge"> {post.like.length} </span> Likes
            </div>
          </li>
        </ul>
        <div className="collapsible">
            <p> {post.description} </p>
        </div>
      </div>
    </div>
    <div>

    <h4 style={{ margin: "auto" , wordSpacing: "2px" , fontWeight: "bold" , marginBottom: "20px" }}> Comments </h4>

    { post.comments.length === 0 && <h6> No Comments Found Yet </h6> }
    { post.comments.map(comment => (
        <div className="collapsible">
                <h6 className="collapsible-header" style={{ margin: "0px 12px" }}> <span style={{ fontWeight: "bold", marginRight: "20px" }}> {comment.postedBy.name.toUpperCase()} </span> {comment.text} </h6>
        </div>
    )) } 
    </div>
    </div>
    ) }
    </>  
    
  );
};

export default PostDetail;
