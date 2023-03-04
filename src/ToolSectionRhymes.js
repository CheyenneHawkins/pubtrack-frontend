import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import search from './images/search.svg'
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

  const [rhymesInput, setRhymesInput] = React.useState('');
  const [rhymesResults, setRhymesResults] = React.useState([]);
  const [rhymesDisplay, setRhymesDisplay] = React.useState(rhymesResults);
  const [rhymesCrumb, setRhymesCrumb] = React.useState('');
  const [paneStyle, setPaneStyle] = React.useState('limited');
  const [rhymeOptions, setRhymeOptions] = React.useState('');
  const [rhymeType, setRhymeType] = React.useState('rhy');

  function valuetext(value) {
    return value
  }

  function getrhymesResults(searchterm) {
    axios.get(`https://api.datamuse.com/words?rel_${rhymeType}=${searchterm}`)
    .then((res) => {
      const rhymesRaw = []

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
      setRhymesResults(rhymesList.length > 0 ? rhymesList : ['No Results Found'])
      // setRhymesResults(rhymesList)
      //set the search term display in header
      setRhymesCrumb(searchterm)

      })
    }
    //clears the rhymes results list
  function clearrhymesResults() {
    const rhymesList = []
    setRhymesResults([])
    setRhymeOptions('')
    setRhymeType('rhy')
    }

    //clicking on a word in the results list refreshes search with that word
  function clickRhymeWord(word) {
    getrhymesResults(word)
    setRhymesInput(word)
    const pane = document.getElementById('rhymes-tool-pane')

    // too jumpy when moving slider
    pane.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  //advanced rhyme slider 
  function handleRhymeType(e) {
    const currentType = (rhymeType === 'rhy') ? 1 : 2
    if (e.target.value !== currentType) {
      const newType = (e.target.value === 1? 'rhy' : 'nry')
      setRhymeType(newType)
      // console.log('VALUE:' + e.target.value)
      // console.log('CURRENT:' + currentType)
    }
  }

  //populates the rhyme pane when state is updated
  useEffect(() => {
    const rhymesList = 
    rhymesResults.length > 0 
    ? rhymesResults.map((item, index) => {
      if (index < 150) {
        return <li key={index} ><span className='rhyme-word-link' onClick={()=>{
          clickRhymeWord(item)
        }}>{item}</span></li>
      }
    }) 
    : ''
    setRhymesDisplay(rhymesList)
  }, [rhymesResults])

  //refreshes search when rhyme type is changed
  useEffect(() => {
    if (rhymesInput !== '') {
      getrhymesResults(rhymesInput)
    }
  },[rhymeType])
    
    return (
      <div className= {`rhymes-tool-pane ${paneStyle}`} id='rhymes-tool-pane'>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Rhymes</Typography>
          {(rhymesDisplay !== '' && expanded === 'panel1') && 
          <span className='search-result-header-label'>
            <span className='rhyme-result-type-label'>
              {rhymeType !== 'rhy' && '(loose)'}
            </span>
          {rhymesCrumb}
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
              getrhymesResults(rhymesInput)
            }}
          >
            <TextField 
              fullWidth 
              label="Search" 
              id="fullWidth" 
              onChange={(e) => {
                setRhymesInput(e.target.value)
              }}
            />
            <Button 
              type="submit"
              variant="contained" 
              color="primary" 
              onClick={(e) => {
                e.preventDefault()
                getrhymesResults(rhymesInput)
              }}
            >
              <img src={search} alt="search" height={25} />
            </Button>
            {/* <button onClick={() => {console.log(rhymesResults)}}>S</button> */}
            <button type='button' onClick={() => {
              clearrhymesResults()
              }}>clear</button>
          </form>
        </div>
          <div className='tool-results-container'>
          <Button 
              type="submit"
              variant="outlined" 
              fullWidth 
              color="primary" 
              onClick={(e) => {
                setRhymeOptions(rhymeOptions === '' ? 'show' : '')
              }}
            >
            ADVANCED
            </Button>
            <div className={`rhymes-options ${rhymeOptions}`}>
            <span className='rhyme-type-label'>Strict</span>
              <Slider
                sx={{
                  width: 150,
                }}
                defaultValue={1}
                getAriaValueText={valuetext}
                value={rhymeType === 'rhy'? 1 : 2}
                // valueLabelDisplay="auto"
                onChange={(e) => handleRhymeType(e)}
                marks
                min={1}
                max={2}
              />
            <span className='rhyme-type-label'>Loose</span>
            </div>
            <ul className='rhymes-results-list' id='rhymesresultslist'>
              {rhymesDisplay}
            </ul>

          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}