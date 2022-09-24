
// importing graphQl from Apollo client
import { gql } from '@apollo/client';

// exporting mutation for LOGIN_USER
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// exporting mutation for ADD_USER
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// exporting mutation for SAVE_BOOK
export const SAVE_BOOK = gql`
  mutation saveBook($bookData: SavedBookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      savedBooks {
        authors
        description
        title
        bookId
        image
        link
      }
    }
  }
`;

// exporting mutation for REMOVE_BOOK
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      username
      savedBooks {
        authors
        description
        title
        bookId
        image
        link
      }
    }
  }
`;