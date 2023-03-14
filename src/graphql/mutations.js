import { gql } from 'graphql-tag'

export const REGISTER_USER = gql`
    mutation Mutation(
        $registerInput: RegisterInput
        ) {
            registerUser(
                registerInput: $registerInput
            ) {
            _id
            name
            email
            password
            token
            }
        }
`

export const LOGIN_USER = gql`
    mutation Mutation(
        $loginInput: LoginInput
        ) {
            loginUser(
                loginInput: $loginInput
            ) {
            _id
            name
            email
            token
            }
        }
`