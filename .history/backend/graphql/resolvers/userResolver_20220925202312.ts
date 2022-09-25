import { RegisterInput } from "../../../types/userTypes";


const userResolver = {
    Mutation: {

        // REGISTER USER
        registerUser: async (_:null, args: {registerInput: RegisterInput}) => {

        }

    }
};

export default userResolver;