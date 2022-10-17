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
        # THE ID OF THE LIBRARIAN/ADMIN THAT ALLOWED THE BOOK TO BE ISSUED
        issuedBy: ID
        # TO WHOM IT IS BEING BORROWED
        issuedTo: ID

        # ADDED FIELDS
        addedBy: ID!
        addedAt: String!

        # RETURNED FIELDS
        returnedAt: String
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
    }
`;

export default typeDefs;