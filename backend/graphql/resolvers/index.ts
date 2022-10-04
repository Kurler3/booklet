import libraryResolver from "./libraryResolver";
import userResolver from "./userResolver";


const allResolvers = {
    // QUERIES
    Query: {
        ...userResolver.Query,
        ...libraryResolver.Query,
    },

    // MUTATIONS
    Mutation: {
        ...userResolver.Mutation,
    },
};

export default allResolvers;