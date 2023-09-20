import React, { useState } from 'react'

const User = () => {
  const [input, setInput]= useState({name:"", email:""})
  const registerUser=async()=>{
    try {
      
      const response = await fetch("http://localhost:4000/addUser",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(input)
      })
       if(!response.ok){
        alert("something went wrong try again")
        return
       }
       const data = await response.json()
       console.log(data)
       alert("success")
       localStorage.setItem("userId", JSON.stringify(data[0].id))
       setInput({name:"", email:""})
    } catch (error) {
      console.log(error.message)
    }
  }
    const submitHandeler= (e)=>{
      e.preventDefault()
      if(!input.email && input.name){
        alert ("enter name and email")
        return
      }
      localStorage.setItem("email",input.email)
      localStorage.setItem("name", input.name)
      registerUser()

    }
    const inputChangeHandeler=(e)=>{
      let fieldName = e.target.name
      
      let fieldVal= e.target.value
      setInput({...input, [fieldName]:fieldVal})
 
    

    }
  return (
    <>
     <form action="" onSubmit={submitHandeler}>

        <input type="text" placeholder='enter name' value={input.name} name='name' onChange={inputChangeHandeler}/>
        <br />
        <input type="email" placeholder='enter email' value={input.email} name='email' onChange={inputChangeHandeler} />
        <br />
        <button type="submit">submit</button>
     </form>
    </>
  )
}

export default User
