import * as React from 'react';
import { styled } from '@mui/material/styles';

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { OutlinedInput } from '@mui/material';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import search from '../images/search.svg'
import cancel from '../images/cancel.svg'
import axios from 'axios';
import { useEffect } from 'react';

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

export default function ToolSectionRhymes() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : true);
  };

  const [input, setInput] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [display, setDisplay] = React.useState(results);
  const [crumb, setCrumb] = React.useState('');
  const [options, setOptions] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [type, setType] = React.useState('rhy');
  
  const [paneStyle, setPaneStyle] = React.useState('limited');

  function valuetext(value) {
    return value
  }

  function getresults(searchterm) {
    axios.get(`https://api.datamuse.com/words?rel_${type}=${searchterm}&topics=${topic}`)
    .then((res) => {
      const rhymesRaw = []
      console.log(`https://api.datamuse.com/words?rel_${type}=${searchterm}&topics=${topic}`)

      //add results to array
      res.data.map(item => {
        return rhymesRaw.push(item)
      })

      //sort results by score
      rhymesRaw.sort((a, b) => {
        return b.score - a.score
      })

      const rhymesList = []
      rhymesRaw.map(item => {
        return rhymesList.push(item.word)
      })

      //add sorted results to state
      setResults(rhymesList.length > 0 ? rhymesList : ['No Results Found'])
      // setResults(rhymesList)
      //set the search term display in header
      setCrumb(searchterm)

      })
    }
    //clears the rhymes results list
  function clearresults() {
    const rhymesList = []
    setResults([])
    setOptions('')
    setType('rhy')
    setInput('')
    }

    //clicking on a word in the results list refreshes search with that word
  function clickRhymeWord(word) {
    getresults(word)
    setInput(word)
    const pane = document.getElementById('rhymes-tool-pane')

    // too jumpy when moving slider
    pane.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  //advanced rhyme buttons 
  function handleType(e) {
    const currentType = (type === 'rhy') ? 1 : 2

    if (e.target.value === currentType) {
      return
    }
    const newType = (e.target.value == 1 ? 'rhy' : 'nry')
    setType(newType)
    // console.log('VALUE:' + e.target.value)
    // console.log('CURRENT:' + currentType)
    // console.log('newType:' + newType)
    // console.log('newType:' + newType)
  }

  //populates the rhyme pane when state is updated
  useEffect(() => {
    const rhymesList = 
    results.length > 0 
    ? results.map((item, index) => {
      if (index < 150) {
        return <li key={index} ><span className='rhyme-word-link' onClick={()=>{
          clickRhymeWord(item)
        }}>{item}</span></li>
      }
    }) 
    : ''
    setDisplay(rhymesList)
  }, [results])

  //refreshes search when rhyme type is changed
  useEffect(() => {
    if (input !== '') {
      getresults(input)
    }
  },[type])
    
    return (
      <div className= {`rhymes-tool-pane ${paneStyle}`} id='rhymes-tool-pane'>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Rhymes</Typography>
          {(display !== '' && expanded === 'panel1') && 
          <span className='search-result-header-label'>
            <span className='rhyme-result-type-label'>
              {type !== 'rhy' && '(loose)'}
            </span>
          {crumb}
          </span>
          }
        </AccordionSummary>
        <AccordionDetails >
        <div 
          className="text-field-search-row"
          id='rhymes'
        >
          <form 
            className='tool-drawer-form'
            onSubmit={(e) => {
              e.preventDefault()
              getresults(input)
            }}
          >
            <OutlinedInput 
              fullWidth 
              id="fullWidth" 
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
              }}
              onFocus={() => {
                setOptions('show')
              }}
              placeholder='Search'
              endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="clear results"
                        onClick={()=>{clearresults()}}
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
                e.preventDefault()
                getresults(input)
              }}
            >
              <img src={search} alt="search" height={25} />
            </Button>
          </form>
        </div>
          <div className='tool-results-container'>
            <div className={`tool-search-options ${options}`}>
              <ToggleButtonGroup
                color="primary"
                exclusive
                value={type === 'rhy'? 1 : 2}
                    // valueLabelDisplay="auto"
                onChange={(e) => handleType(e)}
                aria-label="Platform"
                fullWidth
              >
                <ToggleButton 
                  value={1}              
                >Strict</ToggleButton>
                <ToggleButton value={2}>Loose</ToggleButton>
              </ToggleButtonGroup>
              <div className='topic-field'>
                <form 
                  className='tool-drawer-form'
                  onSubmit={(e) => {
                    e.preventDefault()
                    getresults(input)

                }}
              >
                  <TextField 
                    fullWidth 
                    id="fullWidth" 
                    className='topic'
                    onChange={(e)=> {setTopic(e.target.value)}}
                    size="small"
                    placeholder='topic'
                    focused={false}
                    variant='standard'
                  />
                </form>
              </div>
            </div>
            <ul className='tool-results-list' id='rhymesresultslist'>
              {display}
            </ul>

          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}