import { Box, Typography, useTheme, colors } from "@mui/material";
import MusicPlayer from "./MusicPlayer";
import SessionFooterBar from "./SessionFooterBar";
import '../styles/App.scss';
import { useContext, useState } from "react";
import { login } from "./Login";
import { gql } from 'graphql-tag'

import { AuthContext } from "../context/authContext";
import { useQuery } from "@apollo/client";

const GET_USER_DOCS = gql`
    query GetDocumentsByOwner(
        $owner: String
        ) {
            getDocumentsByOwner(
                owner: $owner
                ) {
                    title
                    }
        }
`


export default function Dashboard(){

    const { user, logout } = useContext(AuthContext)
    const [userDocs, setUserDocs] = useState()

    function GetUserDocs(){

        const { loading, error, data } = useQuery(GET_USER_DOCS, {
            variables: { owner: "cheyenne.hawkins@gmail.com" },
          });
        
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const docList = data.getDocumentsByOwner.map(doc => (
            <li key={doc.title}>
              {doc.title}
            </li>
          ))

          
          return (
            data !== null &&
            setUserDocs(docList)
        );

    }

    // GetUserDocs()

    const { loading, error, data } = useQuery(GET_USER_DOCS, {
        variables: { owner: user?.email },
      });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const docList = data.getDocumentsByOwner.map(doc => (
        <li key={doc.title}>
          {doc.title}
        </li>
      ))
    
    return (
        <>
        <Box 
            width='100%' 
            display='flex' 
            height={'100vh'}
            // bgcolor={colors.grey[800]} 
        >
            <Box 
                width='70%' 
                m='0px 0px 0px 0px' 
                display='flex' 
                justifyContent='center'
                alignItems='center'
                bgcolor={colors.grey[400]} 
            >
            {user 
                ? <h2> Hey {user.name}, you're email address is {user.email}!!</h2>
                : <h2> You should login. </h2>}
                <button onClick={()=> {console.log(user)}}>USER</button>
            </Box>
            {user ?
                <ul>
                    {docList}
                </ul>
                : "Maybe if you logged in, you'd see your songs!"
            }

            <Box 
                width='30%' 
                m='0px 0px 0px 0px' 
                // bgcolor={colors.grey[900]}
                display='flex' 
                justifyContent='center'
                alignItems='center'
            >
                <MusicPlayer />
            </Box>
        </Box>
        </>
    )

}