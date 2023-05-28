const repository = require('../repository/collectionPoint.js')
const validation = require('./validations/collectionPointValidation.js')

exports.getAll = async () => {
    return await repository.getAll();
}

exports.getById = async (id) => {
    let collectionPoint = await repository.getById(id)
    try {
        await validation.isExist(collectionPoint)
    } catch (error) {
        throw error
    }

    return collectionPoint
}

exports.create = async (collectionPoint) => {
    try {
        let result = await repository.create(collectionPoint)
        collectionPoint._id = result.insertedId;
    } catch (error) {
        throw error
    }

    return collectionPoint
}

exports.update = async (id, collectionPoint) => {
    try {
        let updated = await repository.update(id, collectionPoint)
        await validation.isExist(updated.value)
    } catch (error) {
        throw error
    }

    return true;
}

exports.delete = async (id) => {
    try {
        let deleted = await repository.delete(id)
        await validation.isExist(deleted.value)
    } catch (error) {
        throw error
    }
    return true
} 