const repository = require('../repository/demand.js')
const validation = require('./validations/demandValidation.js')
const constants = require('./constants/demand.js')
const timeHelper = require('./helpers/time.js')



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
        setAllItemsAsCreated(request)
        let result = await repository.create(request)
        request._id = result.insertedId;
    } catch (error) {
        throw error
    }
    return request
}

exports.update = async (id, request) => {
    try {
        await validation.isUpdatable(repository, id)
        setAllItemsAsCreated(request)
        request.lastModifiedDate = timeHelper.nowFormatted
        let updated = await repository.update(id, request)
        await validation.isExist(updated.value)
    } catch (error) {
        throw error
    }

    return true;
}

exports.delete = async (id) => {
    try {
        await validation.isDeletable(repository, id)
        let deleted = await repository.delete(id)
        await validation.isExist(deleted.value)
    } catch (error) {
        throw error
    }
    return true
}

setAllItemsAsCreated = (demand) => {
    return demand.requestItems.forEach(item => {
        item.status = constants.createdStatus
    })
}