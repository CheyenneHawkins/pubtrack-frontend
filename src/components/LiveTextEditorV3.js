import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"

const SAVE_INTERVAL_MS = 5000

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }],
  [{ align: [] }],
  ["clean"],
]

export default function TextEditor() {
  const { documentId } = useParams()
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  
  //prevents the blank quill state from saving and overwriting the db
  const [saveStatus, setSaveStatus] = useState(false)

  const [statusLight, setStatusLight] = useState('saved')



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
    console.log('saveStatus:', saveStatus)
    socket.emit("get-document", documentId)
  }, [socket, quill, documentId])



  //UE-RECEIVE CHANGES
  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)
    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])

  //UE-SEND CHANGES
  useEffect(() => {
    if (socket == null || quill == null) return
    
    //saveStatus is set to true when the first change is received
    // setSaveStatus(true)

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
    //   setStatusLight('unsaved')
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])

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
        data: 'hkhkhk'
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
        <button onClick={() => {console.log('click')}}>CLICK IT</button>
        <div >{statusLight}</div>
        <div className="live-quill-container" ref={wrapperRef}>

        </div>

    </>
  )
}