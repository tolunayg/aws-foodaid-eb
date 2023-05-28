const repository = require('../repository/inventory.js')
const validation = require('./validations/inventoryValidation.js')

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

exports.add = async (request) => {
    try {
        for (let index = 0; index < request.items.length; index++) {
            const item = request.items[index];
            let entity = await repository.getByCollectionPointProductCustomFields(request.collectionPointId, item.product, item.customFields)
            if (entity) {
                entity.quantity += item.quantity
                entity.collectionPointId = request.collectionPointId
                await repository.update(entity._id, entity)
            }
            else {
                entity = item
                entity.collectionPointId = request.collectionPointId
                await repository.create(entity)
            }
        }

    } catch (error) {
        throw error
    }

    return true
}