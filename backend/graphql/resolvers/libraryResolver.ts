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

        // DO THE SAME FOR EACH OF THE USERS INSIDE ADMINS/LIBRARIANS
        for(let adminId of newLibrary.admins) {
          if(adminId !== userId) {
            const adminInDb = await UserModel.findById(adminId);
            adminInDb.librariesEnrolled.push(result._id);
            adminInDb.save();
          }
        }

        // LIBRARIANS
        for(let librarianId of newLibrary.librarians) {
          if(librarianId!==userId) {
            const librarianInDb = await UserModel.findById(librarianId)
            librarianInDb.librariesEnrolled.push(result._id);
            librarianInDb.save();
          }
        }

        // RETURN
        return {
          ...result._doc,
          id: result._id,
        };
    },

    // DELETE LIBRARIES
    deleteLibraries: async (_:null, args: {libraryIds: string[]}) => {

      try {
        const {libraryIds} = args;
        
        

        // FOR EACH OF THE LIBRARIES, NEED TO REMOVE THE LIBRARY FROM THE USERS ENROLLED.
        for(let libraryId of libraryIds) {
          // GET LIBRARY OBJECT
          const library = await LibraryModel.findById(libraryId);
        
          // JOIN LIBRARIANS + ADMINS 
          const joinArray = [
            ...library.admins,
            ...library.librarians,
          ];

          // LOOP THOURGH ADMINS + LIBRARIANS
          for(let userId of joinArray) {
            // FIND USER
            const user = await UserModel.findById(userId);
            
            // FIND LIBRARY INDEX
            const libraryIdIndex = user.librariesEnrolled?.findIndex((libraryEnrolledId:string) => libraryEnrolledId === libraryId);

            // REMOVE
            user.librariesEnrolled.splice(libraryIdIndex, 1);

            // SAVE
            user.save();
          }
        }

        // DELETE ALL LIBRARIES WITH THOSE IDS
        await LibraryModel.deleteMany({_id: {$in: libraryIds}});
        
        // RETURN REMOVED LIBRARY IDS
        return libraryIds;   

      } catch (error) {
        console.log('Error deleting libraries...');
        return false;
      }
    }
  },
};

export default libraryResolver;
