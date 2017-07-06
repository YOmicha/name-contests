const _ =  require('lodash');
const humps = require('humps');

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  slug: str => {
    return str.toLowerCase().replace(/[\s\N-]+/,'-');
  },

  orderedFor: (rows, collection, field, singleObject) => {
        const data =  humps.camelizeKeys(rows);
        const inGroupsOffield = _.groupBy(data, field);
        //console.log(inGroupsOffield);
        return collection.map(element => {
            const elementArrary = inGroupsOffield[element];
            //console.log(element);
            if(elementArrary){
                
                return singleObject ? elementArrary[0] : elementArrary;
            }
            return singleObject ? {}: [];
        });
    }

  //,

  /*fromSnakeCase(GraphQLType){
    return {
      type: GraphQLType,
      resolve(obj, args,ctx,{fieldName}){
        return obj[humps.decamelize(fieldName)];
      }
    }
  }*/

};

