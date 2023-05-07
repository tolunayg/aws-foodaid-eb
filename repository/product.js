const { getDb, getObjectId } = require('./config/mongodb');


exports.getAll = async () => (await getDb().collection('products').find().toArray())
exports.getById = async (id) => getDb().collection("products").findOne({ _id: getObjectId(id) })
exports.getAllById = async (id) => (await getDb().collection('products').find({ _id: getObjectId(id) }).toArray())
exports.create = async (product) => getDb().collection('products').insertOne(product);
exports.update = async (id, product) => getDb().collection('products').findOneAndUpdate(
    { _id: getObjectId(id) },
    { $set: product },
    { returnOriginal: false }
);
exports.delete = async (id) => getDb().collection('products').findOneAndDelete({ _id: getObjectId(id) });