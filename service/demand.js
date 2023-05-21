const repository = require('../repository/demand.js')
const validation = require('./validations/demandValidation.js')

exports.getAll = async () => {
    return await repository.getAll();
}

exports.getById = async (id) => {
    let entity = await repository.getById(id)
    try {
        await validation.isExist(entity)
    } catch (error) {
        throw error
    }

    return entity
}

exports.create = async (request) => {
    try {
        await validation.insertValidations(repository, request._id)
    } catch (error) {
        throw error
    }

    let result = await repository.create(request)
    request._id = result.insertedId;

    return request
}

exports.update = async (id, request) => {
    try {
        let updated = await repository.update(id, request)
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