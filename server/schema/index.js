const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, 
        GraphQLString,
        GraphQLList,
        GraphQLID, // Allows string or integer
        GraphQLSchema
    } = graphql;

    
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        // Relations
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent)
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        books: {
            type:
            new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }   
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
                    type: GraphQLID
                }
            },
            resolve(parent, args){
                // Code to grab data from db / other source
                return _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {
                // Expects an id
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args){
                // Code to grab data from db / other source
                return _.find(authors, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})
