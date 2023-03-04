import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import search from './images/search.svg'
import cancel from './images/cancel.svg'

import axios from 'axios';
import { useEffect } from 'react';
import { Divider } from '@mui/material';

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

export default function ToolSectionUrbanDict() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : true);
  };

  const [urbansInput, setUrbansInput] = React.useState('');
  const [urbansResults, setUrbansResults] = React.useState([]);
  const [urbansDisplay, setUrbansDisplay] = React.useState(urbansResults);
  const [urbansCrumb, setUrbansCrumb] = React.useState('');
  const [paneStyle, setPaneStyle] = React.useState('limited');
  const [urbanOptions, setUrbanOptions] = React.useState('');
  const [urbanType, setUrbanType] = React.useState('rhy');

  function valuetext(value) {
    return value
  }

  function getUrbansResults(searchterm) {
    axios.get(`https://api.urbandictionary.com/v0/define?term=${searchterm}`)
    .then((res) => {
      console.log(res);
      const urbansRaw = []

      //add results to array
      res.data.list.map(item => {
        return urbansRaw.push(item)
      })

      //sort results by score
      // urbansRaw.sort((a, b) => {
      //   return b.score - a.score
      // })

      const urbansList = []
      urbansRaw.map(item => {
        return urbansList.push(item.definition)
      })

      //add sorted results to state
      setUrbansResults(urbansList.length > 0 ? urbansList : ['No Results Found'])
      // setUrbansResults(urbansList)
      //set the search term display in header
      setUrbansCrumb(searchterm)

      })
    }
    //clears the urbans results list
  function clearurbansResults() {
    const urbansList = []
    setUrbansResults([])
    setUrbanOptions('')
    setUrbanType('rhy')
    }

    //clicking on a word in the results list refreshes search with that word
  function clickUrbanWord(word) {
    getUrbansResults(word)
    setUrbansInput(word)
    const pane = document.getElementById('urbans-tool-pane')

    // too jumpy when moving slider
    pane.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  //advanced urban slider 
  function handleUrbanType(e) {
    const currentType = (urbanType === 'rhy') ? 1 : 2
    if (e.target.value !== currentType) {
      const newType = (e.target.value === 1? 'rhy' : 'nry')
      setUrbanType(newType)
      // console.log('VALUE:' + e.target.value)
      // console.log('CURRENT:' + currentType)
    }
  }

  //populates the urban pane when state is updated
  useEffect(() => {
    const urbansList = 
    urbansResults.length > 0 
    ? urbansResults.map((item, index) => {
      if (index < 30) {
        // console.log(item)
        const cleanup1 = item.replace(/\[/g, "");
        const cleanup2 = cleanup1.replace(/\]/g, "");
        return <>
          <li key={index} ><span className='urban-word-link' >{cleanup2}</span></li>
          <br/>
          <Divider/>
          <br/>
        </>
      }
    }) 
    : ''
    setUrbansDisplay(urbansList)
  }, [urbansResults])

  //refreshes search when urban type is changed
  useEffect(() => {
    if (urbansInput !== '') {
      getUrbansResults(urbansInput)
    }
  },[urbanType])
    
    return (
      <div className= {`urbans-tool-pane ${paneStyle}`} id='urbans-tool-pane'>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Urban Dictionary</Typography>
          {(urbansDisplay !== '' && expanded === 'panel1') && 
          <span className='search-result-header-label'>
          {urbansCrumb}
          </span>
          }
        </AccordionSummary>
        <AccordionDetails >
        <div 
          className="text-field-search-row"
          id='urbans'
        >
          <form 
            className='tool-drawer-form'
            onSubmit={(e) => {
              e.preventDefault()
              getUrbansResults(urbansInput)
            }}
          >
            <TextField 
              fullWidth 
              label="Search" 
              id="fullWidth" 
              onChange={(e) => {
                setUrbansInput(e.target.value)
              }}
            />
            <Button 
              type="submit"
              variant="contained" 
              color="primary" 
              onClick={(e) => {
                e.preventDefault()
                getUrbansResults(urbansInput)
              }}
            >
              <img src={search} alt="search" height={25} />
            </Button>
            {/* <button onClick={() => {console.log(urbansResults)}}>S</button> */}
          </form>
        </div>
          <div className='tool-results-container'>
          {/* <div className='clear-search-button'>
            <button type='button' onClick={() => {
              clearurbansResults()
              }}>clear
            </button>
          </div> */}
            <ul className='urban-results-list' id='urbansresultslist'>
              {urbansDisplay}
            </ul>

          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}