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

// ADD USERS TO LIBRARY
export const ADD_USERS_TO_LIBRARY = gql`
    mutation AddUsersToLibrary (
        $libraryId: ID!
        $admins: [ID!]!
        $librarians: [ID!]!
        $userId: ID!
    ) {
        addUsersToLibrary (
            libraryId: $libraryId
            admins: $admins
            librarians: $librarians
            userId: $userId
        ) {
            admins
            librarians
        }
    }
`;

// REMOVE USER FROM LIBRARY
export const REMOVE_USER_FROM_LIBRARY = gql`
    mutation RemoveUserFromLibrary(
        $userId: ID!
        $libraryId: ID!
        $userIdToRemove: ID!
    ) {
        removeUserFromLibrary (
            userId: $userId
            libraryId: $libraryId
            userIdToRemove: $userIdToRemove
        )
    }
`;