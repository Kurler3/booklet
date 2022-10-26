import {gql} from '@apollo/client';

// CREATE ISSUE REQUEST
export const CreateIssueRequest = gql`
    mutation CreateLibraryIssueRequest(
        $libraryId: ID!
        $userId: ID!
        $bookId: ID!
    ) {
        createLibraryIssueRequest(

        ) {
            id
            libraryId
            requestingUserId
            createdAt
        }
    }
`;