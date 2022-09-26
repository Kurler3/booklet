import { UserInputError } from "apollo-server-core";
import { RegisterInput } from "../../../types/userTypes";
import { validateRegisterInput } from "../../../utils/validators";


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
           const {username, password, confirmPassword, email} = args.registerInput;
           
        // VALIDATE DATA INPUTTED
        const {valid, errors} = validateRegisterInput(
            username,
            email,
            password,
            confirmPassword,
        );

        // IF NOT VALID, THEN THROW USER INPUT ERROR
        if(!valid) {
            throw new UserInputError('Errors', {
                errors,
            });
        }

        // GET USER IN DB
        

        },

        // LOGIN USER
        loginUser: async (_:null, args: {username: string, password: string}) => {
            
        }

    }
};

export default userResolver;