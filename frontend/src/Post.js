import React, { useEffect, useState } from 'react'

export default function Post() {
    const [showId, setShowId]= useState(-1)
    const [input, setInput]=useState("")
    const [posts, setPosts]=useState([])
    const [reply, setReply]= useState("")
    const [replyId, setReplyId]=useState(-1)
    const [replies, setReplies]= useState([])
    const [repliesFlag, setRepliesFlag]= useState(false)
    const userId=JSON.parse( localStorage.getItem("userId"))
    const loggedInUser=( localStorage.getItem("name"))
    useEffect(()=>{
        getUsersPosts()
     },[])
    const  getUsersPosts=async()=>{
        const response=await fetch(`http://localhost:4000/getUsersPosts/${userId}`)
        if(!response.ok){

            alert("oops something went wrong try again")
            return
        }
        const data = await response.json()
        console.log(data)
        setPosts(data)
      }
   //handle reply
   const handleReply=(id)=>{
    setReplyId(id)
   }
   // submit reply
   const submitReply= async ()=>{
     try {
        const response =await fetch(`http://localhost:4000/addComment/${replyId}`,{
            method:"POST",
             headers:{
              'Content-Type':'application/json'
              },
             body:JSON.stringify({title:reply})
          })
           const data = await response.json()
           
           setReply("")
           setReplyId(-1)
     } catch (error) {
        alert("error ")
     }
   

   }
   //cancel reply
   const cancelReply=()=>{
    setReply("")
    setReplyId(-1)
   }
   //show reply of a
   const showReply=async(postId)=>{
      if(!repliesFlag){
        setShowId(postId)
        const response = await fetch(`http://localhost:4000/getComment/${postId}`)
        const data = await response.json()
        console.log("replies")
        console.log(data)
        setReplies(data)
        setRepliesFlag(!repliesFlag)
      }
      if(repliesFlag){
        setRepliesFlag(!repliesFlag)
        setShowId(-1)
        setReplies([])
      }

   }
    const addPost=async()=>{
        try {
            if(!input){

                alert('post can not be empty')
            }
            const response = await fetch(`http://localhost:4000/addPost/${userId}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({title:input})
            })
            if(!response.ok){
                alert("something went wrong")
                return

            }
            alert("success")
            getUsersPosts()
        } catch (error) {
            
        }

    }
  return (
    <div>
      <input type="text" onChange={(e)=>setInput(e.target.value)} />
      
      <button onClick={addPost}>add</button>
      <p style={{position:'absolute',right:'90px', top:"50px"}}>{`welcome ${loggedInUser}`}</p>
      <hr />
      <ul>

      { posts.length>0 &&
        posts.map((item)=>{
            return(<>
          <li key={item.id}>{item.title} {""} {replyId==item.id?(<>
          <br />
            <input type="text" name="" id="" value={reply} onChange={(e)=>setReply(e.target.value)} />
            <button onClick={submitReply}>submit</button><button onClick={cancelReply}>cancel</button>
          </>
          ):(<>
           <button onClick={()=>handleReply(item.id)}>reply</button> 
          
           {
            repliesFlag && showId===(item.id)&&
           <button onClick={()=>showReply(item.id)}>hide reply</button>
           }
             {
            !repliesFlag && 
           <button onClick={()=>showReply(item.id)}>show reply</button>
           }
          </>)}
            
            <ul>
            {
              replies.length>0 && showId===(item.id) && replies.map((item)=>{
                return(<>
                 <li key={item.id}>{item.title}</li>
                </>)
              })
            }

            </ul>
          </li>  

            </>)
        })
      }
      </ul>
      {posts.length==0 && (<h1> no  post add some posts </h1>)}
    </div>
  )
}
