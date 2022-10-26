import libraryResolver from "./libraryResolver";
import userResolver from "./userResolver";
import bookResolver from "./bookResolver";
import issueRequestResolver from "./issueRequestResolver";

const allResolvers = {
    // QUERIES
    Query: {
        ...userResolver.Query,
        ...libraryResolver.Query,
        ...bookResolver.Query,
        ...issueRequestResolver.Query,
    },

    // MUTATIONS
    Mutation: {
        ...userResolver.Mutation,
        ...libraryResolver.Mutation,
        ...bookResolver.Mutation,
        ...issueRequestResolver.Mutation,
    },
};

export default allResolvers;