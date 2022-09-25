import {gql} from 'apollo-server-micro';

const typeDefs = gql`

    # USER
    type User {
        id: ID
        username: String!
        email: String!
        librariesEnrolled: [ID!]!
        createdAt: Date
    }

    # BOOK
    type Book {
        id: ID
        title: String!
        description: String!
        
        # ISSUED FIELDS
        issuedAt: Date
        # THE ID OF THE LIBRARIAN/ADMIN THAT ALLOWED THE BOOK TO BE ISSUED
        issuedBy: [User]!
        # TO WHOM IT IS BEING BORROWED
        issuedTo: [User]!

        # ADDED FIELDS
        addedBy: [User]!
        addedAt: Date

        # RETURNED FIELDS
        returnedAt: Date
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
        createdAt: Date
    }

    # QUERIES
    type Query {
        # GET USER QUERY
        getUser(userId: ID!): User!
    }

    # MUTATIONS

`;