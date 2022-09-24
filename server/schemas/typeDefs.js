// importing Apollo server express
const { gql } = require("apollo-server-express");


// these are the type definitions for GraphQL to use
// there is a type for Book, User, Auth, and input SavedBooInput and a query for ME
// Mutations are also added for login, addUser, saveBook, and removeBook
const typeDefs = gql`
  type Book {
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!
  }
  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }
  input SavedBookInput {
    authors: [String]
    title: String
    description: String
    bookId: String
    image: String
    link: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: SavedBookInput): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;