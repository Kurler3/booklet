import { gql } from "@apollo/client";

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