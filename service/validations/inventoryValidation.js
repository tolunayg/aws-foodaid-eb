exports.insertValidations = async (repository, id) => {
    var entityAlreadyExists = await checkIfAnyProductWithSameProductId(repository, id)
    if (entityAlreadyExists == true) {
        let error = new Error(`Inventory already exists`)
        error.name = "Inventory Already Exists"
        error.statusCode = 400
        error.isBusinessException = true
        throw error
    }
}

exports.isExist = async (entity) => {
    if (!entity) {
        let error = new Error(`Inventory not found`)
        error.name = "InventoryNotFound"
        error.statusCode = 404
        error.isBusinessException = true
        throw error
    }
}

checkIfAnyEntityWithSameId = async (repository, id) => {
    var entites = await repository.getAllById(id)
    return entites?.length >= 1 ? true : false
}