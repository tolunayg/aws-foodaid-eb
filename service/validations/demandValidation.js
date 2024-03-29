const constants = require('../constants/demand.js')

exports.insertValidations = async (repository, id) => {
    var entityAlreadyExists = await checkIfAnyEntityWithSameId(repository, id)
    if (entityAlreadyExists == true) {
        let error = new Error(`Demand already exists`)
        error.name = "DemandAlreadyExists"
        error.statusCode = 400
        error.isBusinessException = true
        throw error
    }
}

exports.isExist = async (entity) => {
    if (!entity) {
        let error = new Error(`Demand not found`)
        error.name = "DemandNotFound"
        error.statusCode = 404
        error.isBusinessException = true
        throw error
    }
}

exports.isUpdatable = async (repository, id) => {
    let demand = await repository.getById(id)
    if (checkIfAnyItemIsNotInCreatedStatus(demand)) {
        let error = new Error(`All items should be in created status`)
        error.name = "InvalidStatus"
        error.statusCode = 400
        error.isBusinessException = true
        throw error
    }
}

exports.isDeletable = async (repository, id) => {
    let demand = await repository.getById(id)
    if (checkIfAnyItemIsNotInCreatedStatus(demand)) {
        let error = new Error(`All items should be in created status`)
        error.name = "InvalidStatus"
        error.statusCode = 400
        error.isBusinessException = true
        throw error
    }
}

checkIfAnyItemIsNotInCreatedStatus = async (demand) => {
    demand.requestItems.forEach(item => {
        if (item.status != constants.createdStatus) {
            return true
        }
    });
}

checkIfAnyEntityWithSameId = async (repository, id) => {
    var entityList = await repository.getAllById(id)
    return entityList?.length >= 1 ? true : false
}