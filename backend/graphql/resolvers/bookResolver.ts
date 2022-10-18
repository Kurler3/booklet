import BookModel from '../../mongodb/models/Book';
import LibraryModel from '../../mongodb/models/Library';
import {GraphQLError} from 'graphql';

const bookResolver = {

    // QUERIES
    Query: {
        getAllBooks: async () => {
            try {
                const books = await BookModel.find();
                return books;     
            } catch (error) {
                return error;
            }
        }
    },
    // MUTATIONS
    Mutation: {
        // CREATE BOOK
        createBook: async (_:any, args: {
            libraryId: string;
            userId: string;
            title: string;
            description: string;
        }) => {

            try {
                const {
                    libraryId,
                    userId,
                    title,
                    description
                } = args;

                // FETCH THE LIBRARY 
                const library = await LibraryModel.findById(libraryId);

                // CHECK FOR LIBRARY AUTH
                const jointStaffArray = [
                    ...library.admins,
                    ...library.librarians,
                ];
                // IF DOESN'T INCLUDE THIS USER'S ID
                if(!jointStaffArray.includes(userId)) {
                    // RETURN ERROR
                    throw new GraphQLError('You are not authorized to perform this action', {
                        extensions: {
                            code: 'FORBIDDEN',
                        }
                    });
                }

                // CREATE NEW BOOK MODEL
                const newBook = new BookModel({
                    libraryId,
                    title,
                    description,
                    addedBy: userId,
                    addedAt: new Date().toISOString(),
                    
                    // ISSUING PROPERTIES 
                    issuedAt: null,
                    issuedBy: null,
                    issuedTo: null,
                    returnedAt: null,
                    returnedBy: null,
                });

                // SAVE BOOK
                const saveBookResult = await newBook.save();

                // ADD BOOK ID TO LIBRARIES BOOK ARRAY
                library.books = [
                    ...library.books,
                    saveBookResult._id,
                ];

                // SAVE LIBRARY
                await library.save();

                // RETURN
                return {
                    id: saveBookResult._id,
                    ...saveBookResult._doc,
                };
            } catch (error) {
                return error;
            }

        }
    }
};

export default bookResolver;