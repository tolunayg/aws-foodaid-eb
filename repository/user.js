const { getDb, getObjectId } = require('./config/mongodb');

const collectionName = 'users'

exports.getAll = async () => (await getDb().collection(collectionName).find().toArray())
exports.getById = async (id) => getDb().collection(collectionName).findOne({ _id: getObjectId(id) })
exports.getByUsername = async (username) => getDb().collection(collectionName).findOne({ username: username })
exports.getAllById = async (id) => (await getDb().collection(collectionName).find({ _id: getObjectId(id) }).toArray())
exports.create = async (product) => getDb().collection(collectionName).insertOne(product);
exports.update = async (id, product) => getDb().collection(collectionName).findOneAndUpdate(
    { _id: getObjectId(id) },
    { $set: product },
    { returnOriginal: false }
);
exports.delete = async (id) => getDb().collection(collectionName).findOneAndDelete({ _id: getObjectId(id) });