import { gql } from "@apollo/client";

// CREATE BOOK
export const CreateBookMutation = gql`
    mutation CreateBook(
        $libraryId: ID!
        $userId: ID!
        $title: String!
        $description: String!
    ) {
        createBook(
            libraryId: $libraryId
            userId: $userId
            title: $title
            description: $description
        ) {
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

// REMOVE BOOK
export const RemoveBookMutation = gql`
    mutation RemoveBook(
        $libraryId: ID!
        $bookId: ID!
    ) {
        removeBook(
            libraryId: $libraryId
            bookId: $bookId
        ) {
            id
        }
    }
`;