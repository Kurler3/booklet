import { gql } from "apollo-server-core";

// GET ALL USERS QUERY
export const getAllUsersQuery = gql`
    query GetAllUsers {
        getUsers {
            id
            username
            email
            librariesEnrolled
            token
            createdAt
        }
    }
`;