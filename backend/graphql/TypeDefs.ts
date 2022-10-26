import {gql} from 'apollo-server-micro';

const typeDefs = gql`

    # USER
    type User {
        id: ID
        username: String!
        email: String!
        librariesEnrolled: [ID!]!
        token: String!
        createdAt: String!
    }

    # BOOK
    type Book {
        libraryId: ID
        id: ID
        title: String!
        description: String!
        
        # ISSUED FIELDS
        issuedAt: String
        # DUE DATE OF THE LEASE
        issueDueDate: String
        # THE ID OF THE LIBRARIAN/ADMIN THAT ALLOWED THE BOOK TO BE ISSUED
        issuedBy: ID
        # TO WHOM IT IS BEING BORROWED
        issuedTo: ID

        # ADDED FIELDS
        addedBy: ID
        addedAt: String

        # RETURNED FIELDS
        returnedAt: String
    }

    # ISSUE REQUEST
    type IssueRequest {
        # IDS
        id: ID!
        libraryId: ID!
        requestingUserId: ID!
        createdAt: String!
    }

    # LIBRARY
    type Library {
        id: ID
        name: String!
        # CAN'T BE NULL AND THE IDS INSIDE ALSO CAN'T BE NULL
        admins: [ID!]!
        librarians: [ID!]!
        books: [ID]
        createdAt: String
    }

    # REGISTER INPUT
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    # LIBRARY INPUT
    input LibraryInput {
        userId: ID!
        name: String!
        admins: [ID!]!
        librarians: [ID!]!
    }

    # QUERIES
    type Query {
        # GET ALL USERS QUERY
        getUsers: [User]

        # GET ENROLLED LIBRARIES
        getEnrolledLibraries(userId: ID): [Library]

        # GET ALL LIBRARIES
        getAllLibraries: [Library]

        # GET ALL BOOKS
        getAllBooks: [Book]

        # GET ISSUE REQUESTS FROM A GIVEN LIBRARY 
        getLibraryIssueRequests(
            libraryId: ID!
        ): [IssueRequest]
    }

    # MUTATIONS
    type Mutation {
        # REGISTER USER
        registerUser(registerInput: RegisterInput): User!
        # LOGIN USER
        loginUser(username: String!, password: String!): User!

        # CREATE LIBRARY
        createLibrary(libraryInput: LibraryInput): Library!

        # DELETE LIBRARIES
        deleteLibraries(libraryIds: [ID!]): [ID]

        # CREATE BOOK
        createBook(
            libraryId: ID!,
            userId: ID!,
            title: String!,
            description: String!
        ): Book!

        # REMOVE BOOK
        removeBook(
            libraryId: ID!,
            bookId: ID!,
        ):ID

        # ADD EXISTING BOOKS
        addExistingBooks(
            libraryId: ID!,
            bookIds: [ID!]!,
            userId: ID!
        ):[Book]

        # ADD USERS
        addUsersToLibrary(
            libraryId: ID!,
            admins: [ID!]!,
            librarians: [ID!]!,
            userId: ID!
        ):Library!

        # REMOVE USER FROM LIBRARY
        removeUserFromLibrary(
            userId: ID!,
            libraryId: ID!,
            userIdToRemove: ID!,
        ):ID!
    }
`;

export default typeDefs;