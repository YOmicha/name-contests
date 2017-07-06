const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
    
} = require('graphql');
//const { fromSnakeCase } = require('../../lib/util');
//const pgdb = require('../../database/pgdb');
//const mdb = require('../../database/mdb');



module.exports = new GraphQLObjectType({
    name: 'UserType',
    fields: () => {
        const ActivityType =  require('./activity');    
        const ContestsType = require('./contest');
       return { 
        
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
            resolve(obj, args,{loaders} ){
               //return pgdb(pgPool).getContests(obj);     
               return loaders.contestsForUsersIds.load(obj.id);
            }
        },
        contestsCount: {
            type: GraphQLInt,
            resolve(obj, args, {loaders}, {fieldName}){
                //return mdb(mPool).getCounts(obj, fieldName)
                return loaders.mdb.usersByIds.load(obj.id)
                .then(res => res[fieldName]);
            }
        },
        namesCount: {
            type: GraphQLInt,
            resolve(obj, args, {loaders}, {fieldName}){
                //return mdb(mPool).getCounts(obj, fieldName)
                return loaders.mdb.usersByIds.load(obj.id)
                .then(res => res[fieldName]);
            }
        },
        votesCount: {
            type: GraphQLInt,
            resolve(obj, args, {loaders}, {fieldName}){
                //return mdb(mPool).getCounts(obj, fieldName)
                return loaders.mdb.usersByIds.load(obj.id)
                .then(res => res[fieldName]);
            }
        },
        activities:{
            type: new GraphQLList(ActivityType),
            resolve(obj, args, {loaders}){
                return loaders.activitiesForUserIds.load(obj.id);
            }
        }
       }
    }
})