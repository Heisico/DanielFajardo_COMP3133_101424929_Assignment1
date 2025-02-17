const { gql } = require('graphql-tag');

const typeDefs = gql`

    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
        created_at: String!
        updated_at: String!
    }

    type User {  # ✅ Added User type
        id: ID!
        username: String!
        email: String!
        password: String!
        created_at: String!
        updated_at: String!
    }

    type Query {
        employees: [Employee]
        users: [User]  # ✅ Added users query
    }

    type Mutation {
        addEmployee(
            first_name: String!,
            last_name: String!,
            email: String!,
            gender: String!,
            designation: String!,
            salary: Float!,
            date_of_joining: String!,
            department: String!,
            employee_photo: String
        ): Employee

        addUser(  # ✅ Added addUser mutation
            username: String!,
            email: String!,
            password: String!
        ): User
    }
`;

module.exports = typeDefs;
