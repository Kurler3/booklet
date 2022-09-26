import { RegisterInput } from "../../../types/userTypes";


const userResolver = {

    // QUERIES
    Query: {
        
        // GET ALL USERS
        getUsers: async () => {
            
        }

    },

    // MUTATIONS
    Mutation: {

        // REGISTER USER
        registerUser: async (_:null, args: {registerInput: RegisterInput}) => {

        },

        // LOGIN USER
        loginUser: async (_:null, args: {username: string, password: string}) => {
            
        }

    }
};

export default userResolver;