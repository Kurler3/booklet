import BookModel from '../../mongodb/models/Book';

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

    }
};

export default bookResolver;