import { LibraryInput } from "../../../types/libraryTypes";
import LibraryModel from "../../mongodb/models/Library";
import UserModel from "../../mongodb/models/User";

const libraryResolver = {
  // QUERIES
  Query: {
    getEnrolledLibraries: async (
      _: null,
      args: { userId: string | number }
    ) => {
      const { userId } = args;

      try {

        const userInDb = await UserModel.findById(userId);

        const enrolledLibraries = await LibraryModel.find({
          _id: {
            $in: userInDb.librariesEnrolled,
          },
        });

        return enrolledLibraries;
      } catch (error) {
        return error;
      }
    },
  },

  // MUTATIONS
  Mutation: {
    // CREATE LIBRARY
    createLibrary: async (_: null, args: { libraryInput: LibraryInput }) => {
      
        // DECONSTRUCT
        const { userId, name, admins, librarians } = args.libraryInput;

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

        // GET USER IN DB
        const userInDb = await UserModel.findById(userId);

        // ADD LIBRARY ID TO USERS ENROLLED LIBRARIES
        userInDb.librariesEnrolled.push(result._id);

        // SAVE CHANGES
        userInDb.save();

        // RETURN
        return {
          ...result._doc,
          id: result._id,
        };
    },
  },
};

export default libraryResolver;
