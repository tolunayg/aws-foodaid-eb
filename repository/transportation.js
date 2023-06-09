const { getDb, getObjectId } = require('./config/mongodb');

const collectionName = 'transportations'

exports.getAll = async () =>  getDb().collection(collectionName).find().toArray()
exports.getById = async (id) => getDb().collection(collectionName).findOne({ _id: getObjectId(id) })
exports.getByDemandId = async (demandId) => getDb().collection(collectionName).findOne({ demandId: demandId })
exports.create = async (entity) => getDb().collection(collectionName).insertOne(entity);
exports.update = async (id, entity) => getDb().collection(collectionName).findOneAndUpdate(
    { _id: getObjectId(id) },
    { $set: entity },
    { returnOriginal: false }
);