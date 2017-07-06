const {orderedFor} = require('../lib/util');

module.exports = mPool => {
    return {
        //getCounts(user, countsField){
        getUsersByIds(userIds){
            return mPool.collection('users')
            //.findOne({ userId: user.id})
            .find({ userId:  { $in: userIds }})
            .toArray()
            .then(rows => {
                return orderedFor(rows, userIds, 'userId', true)
            });
        }
    }
}