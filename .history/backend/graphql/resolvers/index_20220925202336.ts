import userResolver from "./userResolver";


const allResolvers = {
    // QUERIES


    // MUTATIONS
    Mutation: {
        ...userResolver.Mutation,
    },
};

export default allResolvers;