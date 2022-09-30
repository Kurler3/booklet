import { gql } from "@apollo/client";

// REGISTER USER
export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        registerUser(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            } 
        ) {
            id
            email
            username
            createdAt
            token   
            librariesEnrolled
        }
    }
`;

// LOGIN USER
export const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        loginUser(
            username: $username
            password: $password
        ) {
            id
            email
            username
            createdAt
            token
            librariesEnrolled
        }
    }
`