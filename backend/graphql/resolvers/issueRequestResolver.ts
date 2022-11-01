import {GraphQLError} from 'graphql';
import IssueRequestModel from '../../mongodb/models/IssueRequest';
import LibraryModel from '../../mongodb/models/Library';
import BookModel from '../../mongodb/models/Book';


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
        // CREATE LIBRARY ISSUE REQUEST
        createLibraryIssueRequest: async (_:null, args: {
            libraryId: string;
            userId: string;
            bookId: string;
        }) => {
            try {

                const {
                    libraryId,
                    userId,
                    bookId,
                } = args;

                // CREATE NEW ISSUE REQUEST 
                const newIssueRequest = new IssueRequestModel({
                    libraryId: libraryId,
                    bookId: bookId,
                    requestingUserId: userId,
                    createdAt: new Date().toISOString(),
                });

                // AWAIT SAVE
                const result = await newIssueRequest.save();

                return {
                    id: result._id,
                    ...result._doc,
                };
            } catch(error) {
                throw new GraphQLError(error as string);
            }
        },

        // DELETE ISSUE REQUEST
        deleteLibraryIssueRequest: async (_:null, args: {
            issueRequestId: string;
            userId: string;
            isAccepting: boolean;
        }) => {
            try {

                // GET ARGUMENTS
                const {
                    issueRequestId,
                    userId,
                    isAccepting,
                } = args;

                 
                // IF ONE OF THEM WAS NOT PASSED
                if(!userId || !issueRequestId) {
                    throw new GraphQLError(
                        'Missing params'
                    );
                }

                const issueRequest = await IssueRequestModel.findById(issueRequestId);

                if(!issueRequest) {
                    throw new GraphQLError("Issue request not found!");
                }
                

                // IF USER ID IS NOT THE SAME AS THE CREATOR OF THE ISSUE REQUEST
                if(userId !== issueRequest.requestingUserId) {

                    // CHECK IF USER WAS AN ADMIN/LIBRARIAN IN THE LIBRARY THAT THIS ISSUE REQUEST BELONGS
                    const library = await LibraryModel.findById(issueRequest.libraryId);

                    if(!library) {
                        throw new GraphQLError("Issue request library not found!");
                    }

                    const staffIds = [
                        ...library.admins,
                        ...library.librarians,
                    ];

                    if(!staffIds.includes(userId)) {
                        throw new GraphQLError('Not authorized');
                    }
                }

                // IF IS ACCEPTING, THEN NEED TO UPDATE RELATED BOOK
                if(isAccepting) {
                    const book = await BookModel.findById(issueRequest.bookId);

                    book.issuedAt = new Date().toISOString();
                    book.issueDueDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
                    book.issuedBy = userId;
                    book.issuedTo = issueRequest.requestingUserId;
                    
                    // SAVE
                    await book.save();
                }

                // DELETE ISSUE REQUEST
                await IssueRequestModel.deleteOne({_id: issueRequestId});
                
                return issueRequestId;

            } catch (error) {
                throw new GraphQLError(error as string);
            }
        },
    },
};

// EXPORT
export default issueRequestResolver;