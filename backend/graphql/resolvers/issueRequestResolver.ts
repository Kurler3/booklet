import {GraphQLError} from 'graphql';
import IssueRequestModel from '../../mongodb/models/IssueRequest';


// INIT RESOLVER
const issueRequestResolver = {
    // QUERIES
    Query: {
        // GET LIBRARY ISSUE REQUESTS
        getLibraryIssueRequests: async (_:null, args: {
            libraryId: string;
        }) => {
            try {
                const {
                    libraryId
                } = args;

                const result = await IssueRequestModel.find({libraryId: libraryId});

                return result;
            } catch (error) {
                throw new GraphQLError(
                    error as string,
                );
            }
        }
    },
    // MUTATIONS
    Mutation: {

    },
};

// EXPORT
export default issueRequestResolver;