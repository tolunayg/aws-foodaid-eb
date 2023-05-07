const distributionPointRepository = require('../repository/distributionPoint.js')
const distributionPointValidation = require('./validations/distributionPointValidation.js')

exports.getAll = async () => {
    return await distributionPointRepository.getAll();
}

exports.getById = async (id) => {
    let distributionPoint = await distributionPointRepository.getById(id)
    try {
        await distributionPointValidation.isExist(distributionPoint)
    } catch (error) {
        throw error
    }

    return distributionPoint
}

exports.create = async (distributionPoint) => {
    try {
        await distributionPointValidation.insertValidations(distributionPointRepository, distributionPoint._id)
    } catch (error) {
        throw error
    }

    let result = await distributionPointRepository.create(distributionPoint)
    distributionPoint._id = result.insertedId;

    return distributionPoint
}

exports.update = async (id, distributionPoint) => {
    try {
        let updated = await distributionPointRepository.update(id, distributionPoint)
        await distributionPointValidation.isExist(updated.value)
    } catch (error) {
        throw error
    }

    return true;
}

exports.delete = async (id) => {
    try {
        let deleted = await distributionPointRepository.delete(id)
        await distributionPointValidation.isExist(deleted.value)
    } catch (error) {
        throw error
    }
    return true
} 