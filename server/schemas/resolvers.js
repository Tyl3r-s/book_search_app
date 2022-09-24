// importing required functions and User model
const { AuthenticationError } = require("apollo-server-errors");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

// resolvers function start
const resolvers = {

  // queries are defined here
    Query: {
      // this queries me - the logged in user
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id }).select(
            "-__v -password"
          );
          return userData;
        }
        throw new AuthenticationError("Not logged in");
      },
    },
    // mutations start here
    Mutation: {
      // This is the login user mutation with authentication and returns a token and User
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError("Invalid credentials");
        }
  
        const correctPassword = await user.isCorrectPassword(password);
        if (!correctPassword) {
          throw new AuthenticationError("Invalid credentials");
        }
        const token = signToken(user);
  
        return { token, user };
      },
      // this is the addUser muatation that returns a token and a user - used in the signup form
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },

      // the savebook mutation is executed after a search when the user clicks the button to save the book
      // book is added to savedbooks array so it can be used to populate the saved books page
      saveBook: async (parent, { bookData }, context) => {
        console.log(bookData);
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: bookData } },
            { new: true, runValidators: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError("You need to be logged in!");
      },
      // remove book mutation is called when a user deletes a book from their savedbooks page
      // book id is then pulled from the savedBooks array
      removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    },
  };
  
  module.exports = resolvers;