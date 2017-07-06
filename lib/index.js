const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const pg = require('pg');
const pgConfig =  require('../config/pg')[nodeEnv];
const pgPool =  new pg.Pool(pgConfig);

const app = require('express')();

const ncSchema = require('../schema');
const graphqlHTTP = require ('express-graphql');


const { MongoClient, Logger} =  require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

const DataLoader = require('dataloader');
MongoClient.connect(mConfig.url, (err, mPool) => {
assert.equal(err, null);
console.log(`error:${err}`);
const pgdb = require('../database/pgdb')(pgPool);

Logger.setLevel('debug');
Logger.filter('class',['Server']);

const mdb = require('../database/mdb')(mPool);

/*mdb.getUsersByIds([2,1]).then(res =>{
    console.log(res);
})*/

app.use('/graphql', (req, res) => {
    const loaders =  {
        usersByIds: new DataLoader(pgdb.getUsersByIds),
        userByApiKeys: new DataLoader(pgdb.getUserByApiKeys),
        namesForContestsIds: new DataLoader(pgdb.getNamesForContestsIds),
        contestsForUsersIds: new DataLoader(pgdb.getContestsForUsersIds),
        totalVotesByNameIds: new DataLoader(pgdb.getTotalVotesByNamesIds),
        activitiesForUserIds: new DataLoader(pgdb.getActivitiesForUserIds),
        mdb: {
            usersByIds: new DataLoader(mdb.getUsersByIds)
        }    
    };
    graphqlHTTP({
        schema: ncSchema, 
        graphiql: true,
        context: {pgPool, mPool, loaders}
    })(req, res);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is listenning on port: ${PORT}`);
})


});



