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
        id: ID
        title: String!
        description: String!
        
        # ISSUED FIELDS
        issuedAt: String
        # THE ID OF THE LIBRARIAN/ADMIN THAT ALLOWED THE BOOK TO BE ISSUED
        issuedBy: [User]!
        # TO WHOM IT IS BEING BORROWED
        issuedTo: [User]!

        # ADDED FIELDS
        addedBy: [User]!
        addedAt: String!

        # RETURNED FIELDS
        returnedAt: String
        returnedBy: [User]!
    }

    # LIBRARY
    type Library {
        id: ID
        name: String!
        # CAN'T BE NULL AND THE IDS INSIDE ALSO CAN'T BE NULL
        admins: [User!]!
        librarians: [User!]!
        books: [Book]
        createdAt: String
    }

    # REGISTER INPUT
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    # QUERIES


    # MUTATIONS
    type Mutation {
        # REGISTER USER
        registerUser(registerInput: RegisterInput): User!
        # LOGIN USER
        loginUser(username: String!, password: String!): User!

    }
`;

export default typeDefs;