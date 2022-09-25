import userResolver from "./userResolver";


export default {
    // QUERIES
    

    // MUTATIONS
    Mutation: {
        ...userResolver.Mutation,
    },
};