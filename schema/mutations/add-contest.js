const {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString  
} = require('graphql');

const pgdb = require('../../database/pgdb');
const ContestType = new require('../types/contest');

const ContestInputType  = new GraphQLInputObjectType({
    name: 'ContestType',
    fields: {
        apiKey: { type: new GraphQLNonNull(GraphQLString)},
        title:{ type: new GraphQLNonNull(GraphQLString)},
        description: { type: GraphQLString }
    }
});

module.exports = {
    type: ContestType,
    args: {
        input: {type: new GraphQLNonNull(ContestInputType)}
    },
    resolve( obj, {input} , {pgPool}){
         return pgdb(pgPool).addNewContest(input);
    }
}