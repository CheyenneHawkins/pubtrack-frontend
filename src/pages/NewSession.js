import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid';
import wait from 'waait';
import globeloader from '../images/globe-loader.gif';

export default function NewSession() {
const navigate = useNavigate();

useEffect(()=>{
    setTimeout(() => {navigate(`/session/${uuidV4()}`)}, 500)
    // navigate(`/session/${uuidV4()}`);
}, [])

    return (
<div className='triangles'>
  <div className='tri invert'></div>
  <div className='tri invert'></div>
  <div className='tri'></div>
  <div className='tri invert'></div>
  <div className='tri invert'></div>
  <div className='tri'></div>
  <div className='tri invert'></div>
  <div className='tri'></div>
  <div className='tri invert'></div>
</div>
  )
}
