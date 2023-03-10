import { useCallback, useEffect, useContext, useState } from "react"
import { AuthContext } from '../context/authContext';

import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import CustomToast from "./CustomToast"

const SAVE_INTERVAL_MS = 5000

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }],
  [{ align: [] }],
  ["clean"],
]

export default function TextEditor(props) {

    const { user, logout } = useContext(AuthContext)

    const { documentId } = useParams()

    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    //prevents the blank quill state from saving and overwriting the db
    const [saveStatus, setSaveStatus] = useState(false)

    const [statusLight, setStatusLight] = useState('saved')
    const [socketStatus, setSocketStatus] = useState(true)

    const { songTitle, setSongTitle } = props;
    const owner = user ? user.email : '';;


    useEffect(() => {
        const s = io("http://localhost:3001")
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])

//UE-LOAD DOCUMENT
    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once("load-document", document => {
            quill.setContents(document)
            quill.enable()
        })
        setSocketStatus(true)
        console.log('saveStatus:', saveStatus)
        
        socket.emit("get-document", documentId, owner, songTitle)
    
    }, [socket, quill, documentId])

//UE-SEND CHANGES
    useEffect(() => {
        
        if (socket == null || quill == null) return
        
        //saveStatus is set to true when the first change is received
        // setSaveStatus(true)

        const handler = (delta, oldDelta, source) => {
        if (source !== "user") return

        if (socket.status === false) {
            console.log('should send changes')
            setSocketStatus(false)
            return
        }
        socket.emit("send-changes", delta)
    //   setStatusLight('unsaved')
        }
        quill.on("text-change", handler)

        return () => {
            quill.off("text-change", handler)
        }
    }, [socket, quill])

//UE-RECEIVE CHANGES
    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = delta => {
            quill.updateContents(delta)
        }

        const titleHandler = songTitle => {
            console.log(songTitle)
            setSongTitle(songTitle)
        }

        socket.on("receive-changes", handler)
        socket.on("receive-title", titleHandler)
        return () => {
            socket.off("receive-changes", handler)
        }
    }, [socket, quill])

//UE-SET TITLE
    useEffect(() => {
        if (socket == null || quill == null) return

        socket.emit("set-title", songTitle)

    }, [songTitle])


    //UE-SAVE DOC
    useEffect(() => {
        if (socket == null || quill == null) return

        //only saves if saveStatus has been triggered
        if (saveStatus) {
            console.log('saveStatus:', saveStatus)

            socket.emit("save-document", quill.getContents())
            console.log("saved")
            
            const interval = setInterval(() => {
                socket.emit("save-document", quill.getContents())
                // setStatusLight('saved')
                console.log("saved")
            }, SAVE_INTERVAL_MS)
            
            return () => {
                clearInterval(interval)
            }
        }
        }, [socket, quill])

    // DOESN'T WORK
        //   useEffect(() => {
        //     if (socket && socket.status === false) {
        //         console.log('should send changes')
        //         setSocketStatus(false)
        //         return
        //     }
        //     return
        //   }, [socket])

    //waits for page to load, then adds element to the parent component
    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        
        wrapper.append(editor);
        const q = new Quill(editor, {
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTIONS },
            placeholder: "WRITE A SONG",
            // data: 'hkhkhk'
        })
        q.disable()
        q.setText('✎ ✎ ✎')
        setQuill(q)
        // editor.classList.add('animate-character')
        // setTimeout(() => {
        //     editor.classList.remove('animate-character')
        // }, 1000)
        // allows saving after the content has loaded in
        setSaveStatus(true)
    }, [])
    return (
        <>
            <CustomToast show={!socketStatus} message='Document is offline' autoHideDuration={null} severity='warning'/>

            <button onClick={() => {console.log(socket)}}>SOCKET LOG</button>
            <br />
            <button onClick={() => {console.log(user)}}>USER LOG</button>
            <br />
            <button onClick={() => {setSocketStatus(!socketStatus)}}>MOCK DISCONNECT</button>
            <div >{statusLight}</div>
            <div className="live-quill-container" ref={wrapperRef}>

            </div>

        </>
    )
}