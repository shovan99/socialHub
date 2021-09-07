import React , { useState , useEffect } from 'react'
import { useHistory } from "react-router-dom"

import M from "materialize-css"

const CreatePost = () => {
    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")
    const [image , setImage] = useState("")
    const [url , setUrl] = useState("")

    const [spin , setsSpin] = useState(false)

    useEffect(() => {
        if( url ) {
        fetch("/createpost" , {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title: title,
                description: description,
                picc: url
            })
        }).then(res =>
            res.json()).then(data => {
            if( data.error ) {
                setsSpin(false);
                M.toast({ html: data.error , classes: '#9fa8da' })
            }
            else {
                setsSpin(false)
                M.toast({ html: "Post Created" , classes: 'rounded #2e7d32 green darken-3' })
                history.push("/")
            }
        }).catch(err=> console.log(err))
    }
    },[url])

    const history = useHistory()
    const postData = () => {
        setsSpin(true);
        const data = new FormData()
        data.append("file" , image)
        data.append("upload_preset" , "shovancloudinary")
        data.append("cloud_name" , "shovancloudinary")
        fetch("https://api.cloudinary.com/v1_1/shovancloudinary/image/upload",{
            method: "POST",
            body: data
        }).then(res => 
            res.json()
        ).then(data => {
            if(data.error) {
                setsSpin(false);
                M.toast({ html: data.error.message , classes: "rounded #e65100 orange darken-4" })
                return
            }
            setUrl(data.url)
        }).catch(err => console.log(err))

    }
    return (
        <div className="card input-filed container" style={{ margin: "10px auto" , maxWidth: "500px" , padding: "20px" , textAlign: "center" }}>
            <input type="text" value={title} onChange={e=> setTitle(e.target.value)} placeholder="Write Post Title Here"/>
            <input type="text" value={description} onChange={e=> setDescription(e.target.value)} placeholder="Write Post Description Here"/>
            <div class="file-field input-field">
               <div class="btn">
                  <span>File</span>
                  <input type="file" onChange={e=> setImage(e.target.files[0])}/>
               </div>
            <div class="file-path-wrapper">
                  <input class="file-path validate" type="text"/>
              </div>
            </div>

            { spin===false ? (
                <button className="btn waves-effect waves-light" onClick={() => postData()}> SUBMIT </button>
            ) : (
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
            ) }
            
            
        </div>
    )
}

export default CreatePost
