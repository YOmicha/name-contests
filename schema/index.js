// Import type helpers from graphql-js
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

///const pgdb = require('../database/pgdb');
const MeType = require('./types/me');
const UserType = require('./types/user');

// The root query type is where in the data graph
// we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
 
  fields: {
    /*hello: {
      type: GraphQLString,
      description: "this is a description",
      resolve: () => 'world'
    },*/
    me:{
        //type: MeType,
        type: UserType,
        description:"description of me",
        args:{
            key:{
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: (obj, args, {loaders}) =>{
            /*return {
                id:42,
                email: 'asdas@asd.com '
            }*/
            //return pgdb(pgPool).getUserByApiKey(args.key);        
            return loaders.userByApiKeys.load(args.key);
        }
    }
  }
});

const AddContestMutation =  require('./mutations/add-contest');

const RootMutationtype =  new GraphQLObjectType({
  name: 'RootMutationtype',
  fields: () => ({
    AddContest: AddContestMutation
  })
});



const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationtype
  // mutation: ...
});

module.exports = ncSchema;
