const { getDb, getObjectId } = require('./config/mongodb');


exports.getAll = async () => (await getDb().collection('distributionPoints').find().toArray())
exports.getById = async (id) => getDb().collection("distributionPoints").findOne({ _id: getObjectId(id) })
exports.getAllById = async (id) => (await getDb().collection('distributionPoints').find({ _id: getObjectId(id) }).toArray())
exports.create = async (entity) => getDb().collection('distributionPoints').insertOne(entity);
exports.update = async (id, entity) => getDb().collection('distributionPoints').findOneAndUpdate(
    { _id: getObjectId(id) },
    { $set: entity },
    { returnOriginal: false }
);
exports.delete = async (id) => getDb().collection('distributionPoints').findOneAndDelete({ _id: getObjectId(id) });