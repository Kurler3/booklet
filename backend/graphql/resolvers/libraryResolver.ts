import { LibraryInput } from "../../../types/libraryTypes";
import LibraryModel from "../../mongodb/models/Library";
import UserModel from "../../mongodb/models/User";
import BookModel from "../../mongodb/models/Book";
import { GraphQLError } from "graphql";

const libraryResolver = {
  // QUERIES
  Query: {
    // GET ENROLLED LIBRARIES GIVEN USER ID
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

    // GET ALL LIBRARIES
    getAllLibraries: async () => {
      try {
        const libraries = await LibraryModel.find();
        return libraries;
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

      // JOIN ARRAY OF ADMIN IDS AND LIBRARIAN IDS
      const joinUserIdArray = [...admins, ...librarians];

      // LOOP JOIN ARRAY
      for (let joinUserId of joinUserIdArray) {
        if (joinUserId !== userId) {
          const joinUserInDb = await UserModel.findById(joinUserId);
          joinUserInDb.librariesEnrolled.push(result._id);
          joinUserInDb.save();
        }
      }

      // RETURN
      return {
        ...result._doc,
        id: result._id,
      };
    },

    // DELETE LIBRARIES
    deleteLibraries: async (_: null, args: { libraryIds: string[] }) => {
      try {
        // GET LIBRARY IDS
        const { libraryIds } = args;
        // FOR EACH OF THE LIBRARIES, NEED TO REMOVE THE LIBRARY FROM THE USERS ENROLLED.
        for (let libraryId of libraryIds) {
          // GET LIBRARY OBJECT
          const library = await LibraryModel.findById(libraryId);

          // JOIN LIBRARIANS + ADMINS
          const joinArray = [
            ...library.admins,
            ...library.librarians,
            // ...library.normalUsers
          ];

          // LOOP THOURGH ADMINS + LIBRARIANS
          for (let userId of joinArray) {
            // FIND USER
            const user = await UserModel.findById(userId);

            // FIND LIBRARY INDEX
            const libraryIdIndex = user.librariesEnrolled?.findIndex(
              (libraryEnrolledId: string) => libraryEnrolledId === libraryId
            );

            // REMOVE
            user.librariesEnrolled.splice(libraryIdIndex, 1);

            // SAVE
            user.save();
          }

          // LOOP THROUGH BOOKS
          for (let bookId of library.books) {
            const bookInDb = await BookModel.findById(bookId);
            // SET SOME PROPERTIES TO NULL
            bookInDb.libraryId = null;
            bookInDb.issuedAt = null;
            bookInDb.issuedBy = null;
            bookInDb.addedBy = null;
            bookInDb.addedAt = null;
            bookInDb.returnedAt = null;
            // SAVE BOOK
            await bookInDb.save();
          }
        }

        // DELETE ALL LIBRARIES WITH THOSE IDS
        await LibraryModel.deleteMany({ _id: { $in: libraryIds } });

        // RETURN REMOVED LIBRARY IDS
        return libraryIds;
      } catch (error) {
        console.log("Error deleting libraries...");
        return false;
      }
    },

    // ADD USERS TO LIBRARY
    addUsersToLibrary: async (
      _: null,
      args: {
        libraryId: string;
        admins: string[];
        librarians: string[];
        userId: string;
      }
    ) => {
      try {
        const { libraryId, admins, librarians, userId } = args;

        if (!userId) {
          throw new GraphQLError("No User Id");
        } else if (!libraryId) {
          throw new GraphQLError("No Library Id");
        }

        const library = await LibraryModel.findById(libraryId);

        if (library) {
          if (!library.admins.includes(userId)) {
            throw new GraphQLError("Not Authorized");
          }

          // ADD NEW ADMINS
          library.admins.push(...admins);
          // ADD NEW LIBRARIANS
          library.librarians.push(...librarians);

          // SAVE LIBRARY
          await library.save();

          // INIT STAFF ID ARRAY
          const staffIds = [...admins, ...librarians];

          // LOOP EACH STAFF ID
          for (let staffId of staffIds) {
            // FETCH
            const user = await UserModel.findById(staffId);

            // ADD LIBRARY ID TO ENROLLED LIBRARIES
            user.librariesEnrolled.push(libraryId);

            // SAVE
            await user.save();
          }

          // RETURN LIBRARY
          return library;
        } else {
          throw new GraphQLError("No Library Found");
        }
      } catch (error) {
        throw new GraphQLError(error as string);
      }
    },
  },
};

export default libraryResolver;
