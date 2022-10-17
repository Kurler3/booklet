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

// GET ALL LIBRARIES
export const getAllLibrariesQuery = gql`
    query getAllLibraries {
        getAllLibraries {
            id
            name
            admins
            librarians
            books
            createdAt
        }
    }
`;

// GET ALL BOOKS
export const GetAllBooksQuery = gql`
    query getAllBooks {
        getAllBooks {
            id
            libraryId
            title
            description
            issuedAt
            issuedBy
            issuedTo
            addedBy
            addedAt
            returnedAt
        }
    }
`;