import libraryResolver from "./libraryResolver";
import userResolver from "./userResolver";
import bookResolver from "./bookResolver";

const allResolvers = {
    // QUERIES
    Query: {
        ...userResolver.Query,
        ...libraryResolver.Query,
        ...bookResolver.Query,
    },

    // MUTATIONS
    Mutation: {
        ...userResolver.Mutation,
        ...libraryResolver.Mutation,
        ...bookResolver.Mutation,
    },
};

export default allResolvers;