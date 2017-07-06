const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
    
} = require('graphql');
//const { fromSnakeCase } = require('../../lib/util');
const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');
const ContestsType = require('./contest');

module.exports = new GraphQLObjectType({
    name: 'MeType',
    fields:{
        id: {type: GraphQLID},
        /*firstname : { 
            type: GraphQLString,
            resolve: obj => obj.first_name
        },*/
        /*firstName : fromSnakeCase(GraphQLString), 
        lastName : fromSnakeCase(GraphQLString), 
        createdAt : fromSnakeCase(GraphQLString), */
        firstName : { type: GraphQLString }, 
        lastName : { type: GraphQLString }, 
        createdAt : { type: GraphQLString },
        fullName: {
            type: GraphQLString,
            resolve: obj => `${obj.firstName} ${obj.lastName}`
        },         
        email : { type: new GraphQLNonNull(GraphQLString)},
        contests:{
            type: new GraphQLList(ContestsType),
            resolve(obj, args,{pgPool} ){
               return pgdb(pgPool).getContests(obj);     
            }
        },
        contestsCount: {
            type: GraphQLInt,
            resolve(obj, args, {mPool}, {fieldName}){
                return mdb(mPool).getCounts(obj, fieldName)
            }
        },
        namesCount: {
            type: GraphQLInt,
            resolve(obj, args, {mPool}, {fieldName}){
                return mdb(mPool).getCounts(obj, fieldName)
            }
        },
        votesCount: {
            type: GraphQLInt,
            resolve(obj, args, {mPool}, {fieldName}){
                return mdb(mPool).getCounts(obj, fieldName)
            }
        }
    }
})