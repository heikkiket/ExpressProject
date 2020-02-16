const ObjectId = require('mongodb').ObjectId;

module.exports = {
    db: null,

    setDb: function(db) {
        this.db = db;
    },

    getAll: async function() {
        let result = await db.collection("levyt").find({}).toArray();
        return result;
    },

    getSingle: async function(id) {
        let query = {_id: ObjectId(id)};
        let result = await db.collection("levyt").find(query).toArray();
        return result;
    },

    search: async function(q) {
        let query = { $or: [{artist: q}, {album: q}]};
        return await db.collection("levyt").find(query).toArray();
    }
}
