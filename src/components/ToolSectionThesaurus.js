import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import search from '../images/search.svg'
import back from '../images/back.png'
import forward from '../images/forward.png'
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


export default function ToolSectionThesaurus() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : true);
  };

  const [thesaurusInput, setThesaurusInput] = React.useState('');
  const [thesaurusResults, setThesaurusResults] = React.useState([]);
  const [thesaurusDisplay, setThesaurusDisplay] = React.useState(thesaurusResults);
  const [thesaurusCrumb, setThesaurusCrumb] = React.useState('');
  
  const [historyEntries, setHistoryEntries] = React.useState([]);
  const [historyIndex, setHistoryIndex] = React.useState(historyEntries.length);
  const [historyButtons, setHistoryButtons] = React.useState('hide');
  const [historyCrumbDisplay, setHistoryCrumbDisplay] = React.useState('');


  const placeholder = ['word1', 'word2', 'word3', 'word4', 'word5', 'word6', 'word7', 'word8', 'word9', 'word10']

  function getThesaurusResults(searchterm) {
    axios.get(`https://api.datamuse.com/words?ml=${searchterm}`)
    .then((res) => {
      const thesaurusRaw = []

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
      setThesaurusResults(thesaurusList)
      //set the search term display in header
      setThesaurusCrumb(searchterm)

      const history = historyEntries.map((item) => {return `${item} | `})
      setHistoryCrumbDisplay(history)
      })
    }
  function clearThesaurusResults() {
    const thesaurusList = []
    setThesaurusResults(placeholder)
    }

    useEffect(() => {
      const thesaurusList = 
      thesaurusResults.length > 0 
      ? thesaurusResults.map((item, index) => {
        if (index < 100) {
          return <li key={index} alt={item} onClick={()=>{
            historyEntries.push(thesaurusInput)
            getThesaurusResults(item)
            setThesaurusInput(item)
            setHistoryButtons('show')
            }}
            >{item}</li>
        }
      }) 
      : ''
      setThesaurusDisplay(thesaurusList)
      const spot = document.getElementById('thesaurus')
      const field = spot.getElementsByTagName('input')
      field[0].value = thesaurusInput
    }, [thesaurusResults])
    
    return (
      <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Thesaurus</Typography>
          {(thesaurusDisplay !== '' && expanded === 'panel1') && 
          <span className='search-result-header-label'>
          {thesaurusCrumb}
          </span>
          }
        </AccordionSummary>
        <AccordionDetails>
          {/* <button onClick={()=> {console.log(historyEntries)}}>LOG</button> */}
        <div 
          className="text-field-search-row"
          id='thesaurus'
        >
          <form 
            className='tool-drawer-form'
            onSubmit={(e) => {
              e.preventDefault()
              getThesaurusResults(thesaurusInput)
              setHistoryEntries([])
              setHistoryCrumbDisplay('')
            }}
          >
          {/* <div className={`search-history-container ${historyButtons}`}>
            <button className='search-history-button' onClick={() => {
              console.log('forward')
              }}>
              <img src={forward} alt='back' height={15} />
            </button>
            <button className='search-history-button' onClick={() => {
              // console.log(historyEntries[historyIndex + 1])
              getThesaurusResults(historyEntries[historyIndex + 1])

              }}>
              <img src={back} alt='back' height={15} />
            </button>
          </div> */}
            <TextField 
              fullWidth 
              label="Search" 
              id="fullWidth" 
              onChange={(e) => {
                setThesaurusInput(e.target.value)
              }}
            />
            <Button 
              type="submit"
              variant="contained" 
              color="primary" 
              onClick={(e) => {
                e.preventDefault()
                setHistoryEntries([])
                setHistoryCrumbDisplay('')
                getThesaurusResults(thesaurusInput)
              }}
            >
              <img src={search} alt="search" height={25} />
            </Button>
            {/* <button onClick={() => {console.log(thesaurusResults)}}>S</button>
            <button onClick={() => {
              clearThesaurusResults()
              }}>C</button> */}
          </form>
        </div>
          <div className='tool-results-container'>
          <div className="search-history-crumbs">
          {historyCrumbDisplay}
        </div>
            <ul className='tool-results-list' id='thesaurusresultslist'>
              {thesaurusDisplay}
            </ul>

          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}