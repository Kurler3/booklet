import userResolver from "./userResolver";


const allResolvers = {
    // QUERIES
    Query: {
        ...userResolver.Query,
    },

    // MUTATIONS
    Mutation: {
        ...userResolver.Mutation,
    },
};

export default allResolvers;