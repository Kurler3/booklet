import { RegisterInput } from "../../../types/userTypes";


const userResolver = {
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