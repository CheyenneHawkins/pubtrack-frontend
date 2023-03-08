import { gql } from 'graphql-tag'

export const REGISTER_USER = gql`
    mutation Mutation(
        $registerUserRegisterInput: RegisterInput
        ) {
            registerUser(
                registerInput: $registerUserRegisterInput
            ) {
            name
            email
            password
            token
            }
        }
`