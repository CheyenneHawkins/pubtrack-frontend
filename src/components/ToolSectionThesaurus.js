import * as React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import search from '../images/search.svg'
import back from '../images/back.png'
import forward from '../images/forward.png'
import cancel from '../images/cancel.svg'
import axios from 'axios';
import { OutlinedInput } from '@mui/material';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export default function ToolSectionThesaurus() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : true);
  };

  const [input, setInput] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [resutls, setResutls] = React.useState([]);
  const [display, setDisplay] = React.useState(resutls);
  const [crumb, setCrumb] = React.useState('');
  
  const [options, setOptions] = React.useState('');
  const [type, setType] = React.useState('ml');


  const [historyEntries, setHistoryEntries] = React.useState([]);
  const [historyIndex, setHistoryIndex] = React.useState(historyEntries.length);
  const [historyButtons, setHistoryButtons] = React.useState('hide');
  const [historyCrumbDisplay, setHistoryCrumbDisplay] = React.useState('');

  function getResutls(searchterm) {
    axios.get(`https://api.datamuse.com/words?${type}=${searchterm}&topics=${topic}`)
    .then((res) => {
      // console.log(`https://api.datamuse.com/words?${type}=${searchterm}&topics=${topic}`)
      const thesaurusRaw = []

      console.log(res.data.length)

      if (res.data.length >= 0) {
        //add results to array
        res.data.map(item => {
          return thesaurusRaw.push(item)
        })
  
        //sort results by score
        thesaurusRaw.sort((a, b) => {
          return b.score - a.score
        })
  
        const thesaurusList = []
        thesaurusRaw.map(item => {
          return thesaurusList.push(item.word)
        })
  
        //add sorted results to state
        setResutls(thesaurusList)
  
        //set the search term display in header
        setCrumb(searchterm)
  
        const history = historyEntries.map((item) => {return <p key={`${item}-key`} onClick= {()=>{
          getResutls(item)
          setInput(item)
        }}>
        {`${item}`}</p>})
  
        setHistoryCrumbDisplay(history)    
      } 
    })
    }

  function clearResutls() {
    const thesaurusList = []
    setInput('')
    setResutls('')
    setOptions('')
    setCrumb('')
    }

    useEffect(() => {
      const thesaurusList = 
      resutls.length > 0 
      ? resutls.map((item, index) => {
        if (index < 100) {
          return <li key={index} alt={item} onClick={()=>{
            historyEntries.push(input)
            getResutls(item)
            setInput(item)
            setHistoryButtons('show')
            }}
            >{item}</li>
        }
      }) 
      : ''
      setDisplay(thesaurusList)
      const spot = document.getElementById('thesaurus')
      const field = spot.getElementsByTagName('input')
      field[0].value = input
    }, [resutls])

//advanced thesaurus buttons 
  function handleType(e) {
    const currentType = (type === 'ml') ? 1 : 2

    if (e.target.value === currentType) {
      return
    }
    const newType = (e.target.value == 1 ? 'ml' : 'rel_ant')
    setType(newType)

  }

  useEffect(() => {
    if (input !== '') {
      getResutls(input)
    }
  },[type])

  function submitThesaurusEntry(e) {
    e.preventDefault()
    getResutls(input)
    setHistoryEntries([])
    setHistoryCrumbDisplay('')
  }

    
    return (
      <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Thesaurus</Typography>
          {(display !== '' && expanded === 'panel1') && 
          <span className='search-result-header-label'>
          {crumb}
          </span>
          }
        </AccordionSummary>
        <AccordionDetails>
        <div 
          className="text-field-search-row"
          id='thesaurus'
        >
          <form 
            className='tool-drawer-form'
            onSubmit={(e) => {
              submitThesaurusEntry(e)
            }}
          >
            <OutlinedInput 
              fullWidth 
              id="fullWidth" 
              onChange={(e)=> {setInput(e.target.value)}}
              onFocus={() => {
                setOptions('show')
              }}
              value={input}
              placeholder="Search" 
              endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="clear results"
                        onClick={()=>{clearResutls()}}
                        edge="end"
                        >
                        {input.length > 0 &&
                        <img src={cancel} alt="search" height={15} className='faded'/>
                        }
                        </IconButton>
                    </InputAdornment>
              }
            />
            <Button 
              type="submit"
              variant="contained" 
              color="primary" 
              onClick={(e) => {
              submitThesaurusEntry(e)}}
            >
              <img src={search} alt="search" height={25} />
            </Button>
          </form>
        </div>
          <div className='tool-results-container'>
          {/* <div className="search-history-crumbs">
            {historyCrumbDisplay}
          </div> */}
          <div className={`tool-search-options ${options}`}>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={type === 'ml' ? 1 : 2}
              onChange={(e) => handleType(e)}
              aria-label="Platform"
              fullWidth
            >
              <ToggleButton 
                value={1}              
                >Synonyms
                </ToggleButton>
              <ToggleButton 
                value={2}
                >Antonyms
              </ToggleButton>
            </ToggleButtonGroup>
            <div className="topic-field">
            <form 
              className='tool-drawer-form'
              onSubmit={(e) => {
                submitThesaurusEntry(e)
              }}
            >
              <TextField 
                fullWidth 
                id="fullWidth" 
                className='topic'
                onChange={(e)=> {setTopic(e.target.value)}}
                placeholder="topic" 
                focused='false' 
                variant="standard"
              />
            </form>
            </div>
          </div>
              <ul className='tool-results-list' id='thesaurusresultslist'>
                {display}
              </ul>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}