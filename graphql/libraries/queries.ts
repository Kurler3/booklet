import { gql } from "@apollo/client";

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
