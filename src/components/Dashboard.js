import * as React from 'react';

import { Box, Typography, useTheme, colors } from "@mui/material";

import '../styles/App.scss';
import { useContext, useEffect, useState } from "react";


import SongsTable from './SongsTable'
import { GET_USER_DOCS } from '../graphql/queries'
import { AuthContext } from "../context/authContext";
import { useQuery } from "@apollo/client";



export default function Dashboard(){

    const { user, login, logout } = useContext(AuthContext)
    const [userDocs, setUserDocs] = useState()

    function GetUserDocs(){

        const { loading, error, data } = useQuery(GET_USER_DOCS, {
            variables: { owner: user?.email },
          });
        
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :</p>;

        if (data === null || data === userDocs) {
            return
        }
        return setUserDocs(data.getDocumentsByOwner)

    }


    
    
    // GetUserDocs()
    
    const { loading, error, data } = useQuery(GET_USER_DOCS, {
        variables: { owner: user?.email },
    });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    const docList = data.getDocumentsByOwner.map(doc => (
        doc
        // <li key={doc._id}>
        //   <a href={`/session/${doc._id}`}>{doc.title}</a> 
        // </li>
        ))
        
    const songTable = <SongsTable tableHeaders={['Title', 'Writers', 'Status']} tableRows={docList}/>
    
    return (
        <>
        <Box 
            width='100%' 
            display='flex' 
            height={'100vh'}
            // bgcolor={colors.grey[800]} 
        >
            <Box 
                width='100%' 
                m='0px 0px 0px 0px' 
                display='flex' 
                justifyContent='center'
                alignItems='center'
                // bgcolor={colors.grey[400]} 
            >
            <div className='dashboard-container'>
                {user 
                    ? <h2> Hey {user.name}, you're email address is {user.email}!!</h2>
                    : <h2> You should login. </h2>}
                    <button onClick={()=> {console.log(user)}}>USER</button>
                    <button onClick={()=> {console.log(docList)}}>DOC LIST</button>
                {user ?
                    songTable
                    : "Maybe if you logged in, you'd see your songs!"
                }
            </div>
            </Box>
        </Box>
        </>
    )

}