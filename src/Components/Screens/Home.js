import React , { useState , useEffect , useContext } from "react";
import { UserContext } from "../../App"

import { Link , useHistory } from "react-router-dom"

import PostDetail from "./PostDetail"

import M from "materialize-css"

import Spinner from "../Spinner"

const Home = () => {
  const [data , setData] = useState([]);
  const [comment , setComment] = useState("")
  const { state , dispatch } = useContext(UserContext)
  const [spin , setsSpin] = useState(true)


  const history = useHistory()

  const likePost = ( id ) => {
    fetch("/like" , {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json()).then(result => {

      const newData = data.map(item => {
        if( item._id === result._id ) {
            return result
        }
        else {
          return item
        }
      })
      setData(newData)
    })
      
  }
  const dislikePost = ( id ) => {
    fetch("/dislike" , {
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json()).then(result => {

      const newData = data.map(item => {
        if( item._id === result._id ) {
            return result
        }
        else {
          return item
        }
      })
      setData(newData)
    })
  }

  const addComment = ( id , text ) => {
    fetch("/comment" , {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        text: text,
        postId: id
      })
    }).then(res => 
      res.json()).then(result => {
        if( result.error ) {

            return M.toast({ html: result.error })
        }
        console.log(result) 
        setComment("")
        M.toast({ html: "Comment Posted" })
      })
  }

  const loadData = () => {
    fetch("/allposts" , {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => 
      res.json()).then(data => {
        setData(data.posts)
        setsSpin(false)
      })
  }
  const detailPost = ( post ) => {
        return (
            console.log("Triggered"),
            <PostDetail post={post}/>,
            history.push("/postdetail")
        )
  }
  const deletePost = ( postId ) => {
    fetch(`/deletepost/${postId}` , {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json()).then(result => {
      if(result.error) {
        return M.toast({ html: result.error })
      }
      const nwData = data.filter(item => {
        return item._id !== result._id
      })
      setData(nwData)
      M.toast({ html: "Post Removed" })
    })
  }
  useEffect(() => {
    loadData()
  },[])


  return (
    <div classNameName="home container">
    
      {
        spin == true ? (
           <>
           <Spinner/>
           </>
        ) : (
        data.map(post => (
          <div class="card container"  style={{ maxWidth: "600px", margin: "40px auto" , borderRadius: "20px" , border: "2px solid gray" }}>
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator image_hi" style={{ maxHeight : "400px" , borderRadius: "20px 20px 0px 0px" }} src={post.photo}/>
    </div>

    <div className="card-content" style={{ display: "flex" , justifyContent: "space-between" }}>
    
    <Link to={`/user/${post.postedBy._id}`}><h6 style={{ fontWeight: "bold" , fontFamily: "monospace" }}> {post.postedBy.name.toUpperCase()} </h6></Link>
    { post.postedBy._id === state._id && <i className="material-icons" onClick={() => deletePost(post._id)}>delete</i>  }
    {post.like.includes(state._id) ? <i class="material-icons" onClick={() => {dislikePost(post._id)}}>thumb_down</i> : <i class="material-icons" onClick={() => {likePost(post._id)}}>thumb_up</i> }
    </div>

    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4"> {post.title}  </span>
      <p className="right"> {post.like.length} Like </p>
      <p> {post.description} </p>
      <Link to={`/postdetail/${post._id}`}> Details </Link>
      <div class="card-content" style={{ display: "flex" , justifyContent: "space-between" , textAlign: "center" }}>
    <input type="text" value={comment} onChange={( e ) => setComment(e.target.value)} placeholder="Comment Here"></input>
    <button className="waves-effect waves-light btn" onClick={() => addComment(post._id , comment)} style={{ width: "20%" }}>  <i class="material-icons">comment</i> </button>
    </div>
    </div>
  </div>
        ))

        )
      }
      
    </div>
  );
};

export default Home;
