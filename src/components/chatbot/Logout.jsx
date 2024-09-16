import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Cookies from "js-cookie"
const Logout = () => {
    const navigate=useNavigate();
    const handleLogout=()=>{
        const jwt=Cookies.get("jwt");
        console.log(jwt)
        Cookies.remove("jwt");
        navigate("/login");
    }
  return (
    <div>
          <button onClick={handleLogout} className='bg-red-400  '>Logout</button>
    </div>
  )
}

export default Logout
