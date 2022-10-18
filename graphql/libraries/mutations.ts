import { gql } from "@apollo/client";

// CREATE LIBRARY
export const CREATE_LIBRARY = gql`
    mutation CreateLibrary(
        $userId: ID!
        $name: String!
        $admins: [ID!]!
        $librarians: [ID!]!
    ) {
        createLibrary(
            libraryInput: {
                userId: $userId
                name: $name
                admins: $admins
                librarians: $librarians
            }
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

// DELETE LIBRARIES
export const DELETE_LIBRARIES = gql`
    mutation DeleteLibraries (
        $libraryIds: [ID!]
    ) {
        deleteLibraries(
            libraryIds: $libraryIds
        )
    }
`;