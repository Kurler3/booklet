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
        $libraryIds: [ID]
    ) {
        getEnrolledLibraries(
            libraryIds: $libraryIds
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