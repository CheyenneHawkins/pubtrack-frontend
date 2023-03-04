import React, { useState } from 'react'
import LiveTextEditor from './LiveTextEditor'
import LiveTextEditorV2 from './LiveTextEditorV2'
import SessionFooterBar from './SessionFooterBar'
import MenuDrawer from './MenuDrawer'
import SessionToolDrawer from './SessionToolDrawer'
// import DraggableDiv from './DraggableDiv'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import spade from './images/spade.png';
import forward from './images/forward.png';
import confirm from './images/confirm.svg';
import cancel from './images/cancel.svg';


export default function Session() {

    const [scratchPadShow, setScratchPadShow] = useState('scratchpad-collapsed')

    const [toolDrawerOpen, setToolDrawerOpen] = React.useState(true);

    const [songTitle, setSongTitle] = React.useState('Untitled');
    const [songTitleInput, setSongTitleInput] = React.useState(songTitle);
    const [songTitleStatus, setSongTitleStatus] = React.useState('read');

    const handleToolDrawerOpen = () => {
      toolDrawerOpen === false ? setToolDrawerOpen(true) : setToolDrawerOpen(false);
    };


    function toggleScratchPad() {
        setScratchPadShow(scratchPadShow ==='scratchpad-collapsed'?'scratchpad-expanded' :'scratchpad-collapsed')
    }

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
                            onClick={()=>{
                                setSongTitleStatus('edit')
                            }
                            }
                        >
                            <h1>{songTitle}</h1>
                        </button> :
                        (<>
                            <TextField 
                            id="fullWidth" 
                            placeholder={songTitle}
                            variant="standard"
                            value={songTitleInput}
                            onChange={(e) => {
                                setSongTitleInput(e.target.value)
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
                        )
                        }
                    </div>

                    <LiveTextEditor placeholder='THIS IS FOR EVERYONE'/>
                </div>
                <div className='scratch-editor-container'>
                    <Button 
                        onClick={toggleScratchPad}
                        variant='contained'
                        fullWidth
                    >SCRATCHPAD
                    </Button>
                    <div className={scratchPadShow}>
                        <LiveTextEditor placeholder='FOR YOUR EYES ONLY'/>
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
