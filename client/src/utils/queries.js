
// importing graphql from Apollo
import { gql } from '@apollo/client';


// query to get_me when using the savedBooks functions 
export const GET_ME = gql`
  {
    me {
        _id
        username
        email
        bookCount 
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
  }
`;
