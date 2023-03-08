import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid';



export default function NewSession() {
const navigate = useNavigate();

useEffect(()=>{
    navigate(`/session/${uuidV4()}`);
}, [])

    return (
    <div>
      Creating new session...
    </div>
  )
}
