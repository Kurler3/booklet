import { UserInputError } from "apollo-server-core";
import { RegisterInput, UserType } from "../../../types/userTypes";
import { validateLoginInput, validateRegisterInput } from "../../../utils/validators";
import UserModel from '../../mongodb/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (user: UserType) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        librariesEnrolled: user.librariesEnrolled,
        createdAt: user.createdAt,
    }, process.env.JWT_SECRET_KEY!, {expiresIn: '24h'});

    return token;
}

const userResolver = {

    // QUERIES
    Query: {
        
        // GET ALL USERS
        getUsers: async () => {
            const result = await UserModel.find();

            return result;
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

            // GET USER IN DB (EITHER MATCH THE USERNAME OR THE EMAIL)
            const userInDb = await UserModel.findOne({$or: [{username}, {email}]});

            // IF ALREADY EXISTS ONE LIKE THIS
            if(userInDb) {
                const error = userInDb.email === email ? {email: 'This email is already taken'} : {username: "This username is taken"};

                throw new UserInputError('Username or email is already taken', {
                    errors: error,
                });
            }
            
            // HASH THE PASSWORD
            const hashedPassword = await bcrypt.hash(password, 12);

            // NEW USER
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                librariesEnrolled: [],
                createdAt: new Date().toISOString(),
            });

            // SAVE
            const result = await newUser.save();

            // CREATE JWT TOKEN
            const token = generateToken({...result._doc, id: result._id});

            return {
                ...result._doc,
                id: result._id,
                token: token,
            };
        },

        // LOGIN USER
        loginUser: async (_:null, args: {username: string, password: string}) => {
            const {username, password} = args;

            // VALIDATION OF INPUTTED DATA
            const {valid, errors} = validateLoginInput(username, password);

            if(!valid) {
                throw new UserInputError("Login Errors", errors);
            }

            // TRY TO FIND USER IN DB WITH SAME USERNAME
            const user = await UserModel.findOne({username});

            // IF DIDN'T FIND USER
            if(!user) {
                errors.general = "User not found";

                throw new UserInputError("User not found", errors);
            }

            // COMPARE PASSWORD INPUTTED WITH ENCRYPTED FROM DB
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            // IF DOESN'T MATCH
            if(!isPasswordMatch) {
                errors.general = "Wrong credentials";

                throw new UserInputError("Wrong credentials", errors);
            }

            // CREATE JWT TOKEN
            const token = generateToken({...user, id: user._id});

            // RETURN
            return {
                ...user._doc,
                id: user._id,
                token: token,
            }
        }

    }
};

export default userResolver;