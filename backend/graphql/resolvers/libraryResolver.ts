import { LibraryInput } from '../../../types/libraryTypes';
import LibraryModel from '../../mongodb/models/Library';
import UserModel from '../../mongodb/models/User';



const libraryResolver = {

    // QUERIES
    Query: {
        getEnrolledLibraries: async (_:null, args: {libraryIds: string|number[]}) => {
            const {libraryIds} = args;

            try {
                
                const enrolledLibraries = await LibraryModel.find({
                    "_id": {
                        $in: libraryIds
                    }
                });

                return enrolledLibraries;

            } catch (error) {
                return error;
            }
        }
    },

    // MUTATIONS
    Mutation: {

        // CREATE LIBRARY
        createLibrary: async (_:null, args: {libraryInput: LibraryInput}) => {

            // DECONSTRUCT 
            const {
                userId,
                name,
                admins,
                librarians
            } = args.libraryInput;


            // CREATE NEW LIBRARY FROM MODEL
            const newLibrary = new LibraryModel({
                name,
                admins,
                librarians,
                books: [],
                createdAt: new Date().toISOString(),
            });
            
            // SAVE
            const result = await newLibrary.save();

            // // UPDATE USER ENROLLED LIBRARIES ARRAY
            // const userInDb = await UserModel.findById(userId);
            // console.log('Enrolled: ', userInDb)
            // userInDb.enrolledLibraries = [
            //     result._id,
            //     ...userInDb.enrolledLibraries,
            // ];

            // await userInDb.save();

            await UserModel.updateOne(
                {_id: userId},
                {
                    $push: {
                        "user.enrolledLibraries": result._id
                    }
                }
            )

            // RETURN
            return {
                ...result._doc,
                id: result._id,
            };
        },

    }
};

export default libraryResolver;
