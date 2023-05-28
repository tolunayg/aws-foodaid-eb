const { getDb, getObjectId } = require('./config/mongodb');

const collectionName = 'inventories'

exports.getAll = async () => (await getDb().collection(collectionName).find().toArray())
exports.getById = async (id) => getDb().collection(collectionName).findOne({ _id: getObjectId(id) })
exports.getAllById = async (id) => (await getDb().collection(collectionName).find({ _id: getObjectId(id) }).toArray())
exports.getByCollectionPointProductCustomFields = async (collectionPointId, product, customFields) => getDb().
    collection(collectionName).
    findOne({
        collectionPointId: collectionPointId,
        product: product,
        customFields: customFields,
    })
exports.create = async (entity) => getDb().collection(collectionName).insertOne(entity);
exports.update = async (id, entity) => getDb().collection(collectionName).findOneAndUpdate(
    { _id: getObjectId(id) },
    { $set: entity },
    { returnOriginal: false }
);
exports.delete = async (id) => getDb().collection(collectionName).findOneAndDelete({ _id: getObjectId(id) });