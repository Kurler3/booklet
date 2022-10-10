import { gql } from "apollo-server-core";

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

// GET ENROLLED LIBRARIES
export const getEnrolledLibrariesQuery = gql`
    query getEnrolledLibraries(
        $userId: ID
    ) {
        getEnrolledLibraries(
            userId: $userId
        ) {
            id
            name
            admins
            librarians
            books
            createdAt
        }
    }
`;