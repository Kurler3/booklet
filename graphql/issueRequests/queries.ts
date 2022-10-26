import { gql } from "@apollo/client";

// GET ISSUE REQUESTS FROM A SPECIFIC LIBRARY
export const GetLibraryIssueRequests = gql`
    query GetLibraryIssueRequests(
        $libraryId: ID!
    ) {
        getLibraryIssueRequests(
            libraryId: $libraryId
        ) {
            id
            libraryId
            requestingUserId
            createdAt
        }
    }
`;