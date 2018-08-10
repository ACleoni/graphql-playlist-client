const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// Dummy Data

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString },
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

// The place of origin for a query. Can be more than one
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // When someone queries a book
        book: {
            type: BookType,
            args: {
                // Expects an id
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args){
                // Code to grab data from db / other source
               return _.find(books, {id: args.id})
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})
