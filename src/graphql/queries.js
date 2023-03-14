import { gql } from 'graphql-tag'


export const GET_USER_DOCS = gql`
    query GetDocumentsByOwner(
        $owner: String
        ) {
            getDocumentsByOwner(
                owner: $owner
                ) {
                    title
                    _id
                    owner {
                        _id
                        name
                        email
                    }
                    updated_at
                    }
        }
`


export const QUERY_USER_BY_EMAIL = gql`
    query GetUserByEmail(
        $email: String!
    ) {
        getUserByEmail(
            email: $email
        ) {
            name
        }
    }
`

export const GET_DOCUMENT_BY_ID = gql`
    query GetDocumentById(
        $documentId: ID
    ) {
        getDocumentById(
            id: $documentId
        ) {
            title
        }
}   
`
