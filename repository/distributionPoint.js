const { getDb, getObjectId } = require('./config/mongodb');


exports.getAll = async () => (await getDb().collection('distributionPoints').find().toArray())
exports.getById = async (id) => {
    let collection = getDb().collection("distributionPoints");
    let query = { _id: getObjectId(id) };
    let result = await collection.findOne(query);
    return result
}
exports.getAllById = async (id) => (await getDb().collection('distributionPoints').find({ _id: getObjectId(id) }).toArray())
exports.create = async (product) => getDb().collection('distributionPoints').insertOne(product);
exports.update = async (id, product) => getDb().collection('distributionPoints').findOneAndUpdate(
    { _id: getObjectId(id) },
    { $set: product },
    { returnOriginal: false }
);
exports.delete = async (id) => getDb().collection('distributionPoints').findOneAndDelete({ _id: getObjectId(id) });