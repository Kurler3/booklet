import BookModel from '../../mongodb/models/Book';
import LibraryModel from '../../mongodb/models/Library';
import IssueRequestModel from '../../mongodb/models/IssueRequest';
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

                const existingBook = await BookModel.findOne({title: title});

                if(existingBook) {
                    throw new GraphQLError("Book title already taken");
                }

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
                    issueDueDate: null,
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
                bookInDb.issueDueDate = null;
                bookInDb.issuedBy = null;
                bookInDb.addedBy = null;
                bookInDb.addedAt = null;
                bookInDb.returnedAt = null;

                // SAVE BOOK
                await bookInDb.save();

                // TRY TO DELETE ISSUE REQUESTS FROM THAT BOOK
                await IssueRequestModel.deleteMany({bookId: bookId});

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
        },

        // ADD EXISTING BOOKS
        addExistingBooks: async (_:any, args: {
            libraryId: string;
            userId: string;
            bookIds: string[];
        }) => {
            try {
                // GET PARAMS
                const {
                    libraryId,
                    userId,
                    bookIds,
                } = args;

                let newBooks = [];

                // FOR EACH OF THE SELECTED BOOK ID, ADD THE SELECTED LIBRAY ID AS THE LIBRARY ID AND THE   OTHER PROPERTIES NECESSARY TOO.

                // LAUNCH ALL REQUESTS AT ONCE
                for(let bookId of bookIds) {
                    const book = await BookModel.findById(bookId);

                    book.libraryId = libraryId;
                    book.addedAt = new Date().toISOString();
                    book.addedBy = userId;
                    
                    await book.save();

                    newBooks.push(book);
                }

                // NEED TO ADD ALL THESE BOOK IDS TO THE SELECTED LIBRARY "books" PROPERTY
                const library = await LibraryModel.findById(libraryId);

                // PUSH ALL NEW BOOK IDS
                library.books.push(...bookIds);

                // SAVE
                await library.save();
                
                // RETURN LIST OF NEW BOOKS.
                return newBooks;
            } catch (error) {
                throw new GraphQLError(
                    error as string,
                );
            }
        }
    }
};

export default bookResolver;