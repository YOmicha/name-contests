const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} =  require('graphql');

//const pgdb = require('../../database/pgdb');
const NameType = require('./name');
const ContestsStatusType =  require('./contest-status');

module.exports = new GraphQLObjectType({
    name: 'ContestsType',
    fields:{
        id: {type: GraphQLID},
        code: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        code: {type: GraphQLString},
        status: {type: new GraphQLNonNull(ContestsStatusType)},
        createdAt: {type: new GraphQLNonNull(GraphQLString)},
        names: {
            type: new GraphQLList(NameType),
            //resolve(obj, args, {pgPool}){
            resolve(obj, args, {loaders}){
                  //return pgdb(pgPool).getNames(obj);
                  return loaders.namesForContestsIds.load(obj.id);
            }
        }
    }
})