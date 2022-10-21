import BookModel from '../../mongodb/models/Book';
import LibraryModel from '../../mongodb/models/Library';
import {GraphQLError} from 'graphql';
import _ from 'lodash';

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

        },

        // REMOVE BOOK
        removeBook: async (_:any, args: {
            libraryId: string;
            bookId: string;
        }) => {
            try {

                // GET PARAMS
                const {
                    bookId,
                    libraryId,
                } = args;

                // FIND BOOK IN DB
                const bookInDb = await BookModel.findById(bookId);

                // SET SOME PROPERTIES TO NULL
                bookInDb.libraryId = null;
                bookInDb.issuedAt = null;
                bookInDb.issuedBy = null;
                bookInDb.addedBy = null;
                bookInDb.addedAt = null;
                bookInDb.returnedAt = null;

                // SAVE BOOK
                bookInDb.save();

                // FIND LIBRARY IN DB
                const libraryInDb = await LibraryModel.findById(libraryId);

                // REMOVE BOOK ID FROM LIBRARY'S books PROPERTY
                const bookIndex = libraryInDb.books.findIndex((id:string) => bookId === id);
                if(bookIndex !== -1) {
                    libraryInDb.books.splice(bookIndex, 1);
                    await libraryInDb.save();
                }

                // RETURN BOOK ID
                return bookId;
            } catch (error) {
                return error;
            }
        }
    }
};

export default bookResolver;