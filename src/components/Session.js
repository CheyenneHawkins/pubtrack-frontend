import React, { useState, useContext, useRef, useEffect } from 'react'
import { AuthContext } from '../context/authContext';

import QRCode from "react-qr-code";

import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CustomToast from './CustomToast';

import LiveTextEditor from './LiveTextEditor'
import LiveTextEditorV2 from './LiveTextEditorV2'
import TextEditor from './LiveTextEditorV3'
import SessionFooterBar from './SessionFooterBar'
import SessionToolDrawer from './SessionToolDrawer'

import spade from '../images/spade.png';
import forward from '../images/forward.png';
import confirm from '../images/confirm.svg';
import cancel from '../images/cancel.svg';

import { useQuery } from "@apollo/client";
import { GET_DOCUMENT_BY_ID } from '../graphql/queries'
import { useParams } from "react-router-dom"





export default function Session() {

    const { user, logout } = useContext(AuthContext)

    //document id from the url
    const { documentId } = useParams()

    const { loading, error, data } = useQuery(GET_DOCUMENT_BY_ID, {
        variables: { documentId: documentId },
    });

    const [scratchPadShow, setScratchPadShow] = useState('scratchpad-collapsed')

    const [toolDrawerOpen, setToolDrawerOpen] = React.useState(true);

    const [songTitle, setSongTitle] = React.useState();

    //passed as a prop to the Live Editor so socket messages can update it
    const [songTitleInput, setSongTitleInput] = React.useState(songTitle);

    //deteremins if song title is displayed or edit field is displayed
    const [songTitleStatus, setSongTitleStatus] = React.useState('read');

    const songTitleRef = useRef(null);

    const handleToolDrawerOpen = () => {
      toolDrawerOpen === false ? setToolDrawerOpen(true) : setToolDrawerOpen(false);
    };



    function toggleScratchPad() {
        setScratchPadShow(scratchPadShow ==='scratchpad-collapsed'?'scratchpad-expanded' :'scratchpad-collapsed')
    }


    useEffect(() => {
        if (songTitleStatus === 'edit') {
            songTitleRef.current.children[0]?.children[0]?.focus();
            if (songTitleRef.current.children[0]?.children[0].value === 'Untitled') {
                songTitleRef.current.children[0].children[0].select()
            }
        }
    }, [songTitleStatus])

    // updates song input field when colloaborater changes song title;
    // otherwise when user clicks to change title, the placeholder text
    // is outdated
    useEffect(() => {
        setSongTitleInput(songTitle)
    }, [songTitle])

 useEffect(()=> {
    // console.log(data?.getDocumentById.title)
    data && 
    setSongTitle(data?.getDocumentById?.title)
    setSongTitleInput(data?.getDocumentById?.title)
 }, [data])

    return (
    <>
    <button 
      type='button' 
      onClick={handleToolDrawerOpen}
      className={`session-tool-drawer-button ${toolDrawerOpen ? 'toolbar-open' : 'toolbar-closed'}`}
      >
        <span className='vertical-text'>
        {!toolDrawerOpen && <img src={spade} alt='Session Tools' />}
        {toolDrawerOpen && <img src={forward} alt='close Session Tools' height={20} className='session-tools-close-button'/>}
        
        </span>
    </button>
    <div className='session-container'>
        <div className='session'>
            <div className={`text-editors-container ${toolDrawerOpen ? 'toolbar-open' : 'toolbar-closed'}`}>
                <div className='live-editor-container'>
                    <div className='song-title-container'>
                        {songTitleStatus === 'read'  ?
                        <button 
                            type='button' 
                            className='song-title-button' 
                            onClick={()=> {
                                setSongTitleStatus('edit');
                            }
                            }
                        >
                            <h1>{songTitle === '' ? 'Untitled' : songTitle}</h1>
                        </button> :
                        (<>
                            <TextField 
                            id="fullWidth" 
                            placeholder='Untitled'
                            variant="standard"
                            value={songTitleInput}
                            ref={songTitleRef}
                            onChange={(e) => {
                                setSongTitleInput(e.target.value)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    setSongTitle(songTitleInput)
                                    setSongTitleStatus('read')
                                }
                                if (e.key === 'Escape') {
                                    e.preventDefault();
                                    setSongTitleStatus('read')
                                    setSongTitleInput(songTitle)
                                }
                            }}

                        />
                        <button 
                            type='button' 
                            className='song-title-field-button'
                            onClick={()=>{
                                setSongTitle(songTitleInput)
                                setSongTitleStatus('read')
                            }
                            }
                        >
                        <img src={confirm} id='confirm-button' alt='Confirm' />
                        </button>
                        <button 
                            type='button' 
                            className='song-title-field-button'
                            id='cancel-button'
                            onClick={()=>{
                                setSongTitleInput(songTitle)
                                setSongTitleStatus('read')
                            }
                            }
                        >
                        <img src={cancel} alt='Cancel' />
                        </button>
                        </>
                        )}
                        {/* <button type='button' onClick={()=> {console.log(data.getDocumentById.title)}}>LOG</button> */}
                    </div>
                        <TextEditor 
                            placeholder='WRITE A SONG'
                            songTitle={songTitle}
                            setSongTitle={setSongTitle}
                        />
                </div>
                <div className='scratch-editor-container'>
                    <Button 
                        onClick={toggleScratchPad}
                        variant='contained'
                        fullWidth
                    >SCRATCHPAD
                    </Button>
                    <div className={scratchPadShow}>
                        <LiveTextEditor 
                        placeholder='FOR YOUR EYES ONLY'
                        />
                    </div>            
                </div>
            </div>
            <div className='tool-drawer'>

            </div>
            {/* <DraggableDiv /> */}
            <div className='session-footer-container'>
                <SessionFooterBar/>
            </div>
        </div>
            <SessionToolDrawer open={toolDrawerOpen}/>
    </div>
    </>
  )
}
