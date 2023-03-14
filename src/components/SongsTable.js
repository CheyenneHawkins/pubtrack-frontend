import * as React from 'react';

import { Box, Typography, useTheme, colors } from "@mui/material";

import '../styles/App.scss';
import { useContext, useEffect, useState } from "react";

import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function SongsTable(props){

    const { tableHeaders, tableRows
     } = props;
     
     function createRow(props) {
        
        return {
        Title: <a href={`/session/${props._id}`} key={props.index}>{props.title}</a>,
        Writers: props.owner.email,
        Status: 'Open',
        history: [
            {
            date: '2020-01-05',
            },
            {
            date: '2020-01-02',
            },
        ],
        };
    }

    const rows = [
    ];

    tableRows.map((row, index) => {
        return rows.push(createRow(row));
    })

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
    
        return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row.Title}
            </TableCell>
            <TableCell align="left">{row.Writers}</TableCell>
            <TableCell align="left">{row.Status}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                    History
                    </Typography>
                    <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Total price ($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.history.map((historyRow) => (
                        <TableRow key={historyRow.date}>
                            <TableCell component="th" scope="row">
                            {historyRow.date}
                            </TableCell>
                            <TableCell>{historyRow.customerId}</TableCell>
                            <TableCell align="right">{historyRow.amount}</TableCell>
                            <TableCell align="right">
                            {Math.round(historyRow.amount * row.price * 100) / 100}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </Box>
                </Collapse>
            </TableCell>
            </TableRow>
        </React.Fragment>
        );
    }
    
    Row.propTypes = {
        row: PropTypes.shape({
        Title: PropTypes.object,
        Writers: PropTypes.string,
        Status: PropTypes.string,
        history: PropTypes.arrayOf(
            PropTypes.shape({
            amount: PropTypes.number,
            customerId: PropTypes.string,
            date: PropTypes.string,
            }),
        ),
        name: PropTypes.string,
        }),
    };

    
    function CollapsibleTable(tableHeaders) {

        const tableColumns = tableHeaders.map((header, index) => {
            return (
                <TableCell component="th" scope="row" key={index}>
                {header}
                </TableCell>
        )}
        )

        return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                <TableCell />
                {tableColumns}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                <Row key={row._id} row={row} />
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        );
    }

    return CollapsibleTable(tableHeaders)
}