import { gql } from "@apollo/client";

// GET ALL USERS QUERY
export const getAllUsersQuery = gql`
    query GetAllUsers {
        getUsers {
            id
            username
            email
            librariesEnrolled
            createdAt
        }
    }
`;
