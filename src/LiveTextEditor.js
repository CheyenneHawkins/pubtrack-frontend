import React, { useEffect, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { io } from 'socket.io-client';

export default function LiveTextEditor(props) {

    const [value, setValue] = useState();
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState(
        <ReactQuill 
            value={value} 
            onChange={setValue}
            placeholder={props.placeholder}
        />
    );

    useEffect(() => {
        const sckt = io('http://localhost:3001')
        setSocket(sckt)

        return () => {
            sckt.disconnect()
        }
    }, [])

    useEffect(() => {
        // if (socket == null || quill == null) return

        // const handler = (delta, oldDelta, source) => {
        //     if (source === 'user') return
        //     socket.emit('send-changes', delta)
        // }
        
        // // quill.on('text-change', handler)
        // quill.
        // return () => {
        //     quill.off('text-change', handler)
        // }
    }, [socket, quill])

  return (
    <>
        <div id="texteditcontainer">
        {quill}
            {/* <ReactQuill 
                value={value} 
                onChange={setValue}
                placeholder={props.placeholder}
            /> */}
        </div>
    </>
  )
}
