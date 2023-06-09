const repository = require('../repository/transportation.js')
const demandRepository = require('../repository/demand.js')
const inventoryRepository = require('../repository/inventory.js')
const validation = require('./validations/transportationValidation.js')
const demandValidation = require('./validations/demandValidation.js')
const demandConstant = require('./constants/demand.js')
const timeHelper = require('./helpers/time.js')

exports.getAll = async () => {
    return await repository.getAll();
}

exports.getById = async (id) => {
    let transportation = await repository.getById(id)
    try {
        await validation.isExist(transportation)
    } catch (error) {
        throw error
    }

    return transportation
}

exports.create = async (transportation) => {
    try {
        await validation.insertValidations(repository, transportation.demandId)

        let demand = await demandRepository.getById(transportation.demandId)
        await demandValidation.isExist(demand)

        transportation.transportationItems = new Array()
        transportation.loadingDate = timeHelper.nowFormatted
        console.log(transportation)
        for (let index = 0; index < demand.requestItems.length; index++) {
            const requestItem = demand.requestItems[index];
            var inventory = await inventoryRepository.getByCollectionPointProductCustomFields(transportation.collectionPointId, requestItem.product, requestItem.customFields)
            if (inventory != null && inventory.quantity <= 0) break

            if (inventory.quantity < requestItem.quantity) {
                inventory.quantity = 0
                requestItem.satisfiedQuantity = requestItem.quantity - inventory.quantity
                requestItem.unSatisfiedQuantity = requestItem.quantity - requestItem.satisfiedQuantity

                requestItem.status = demandConstant.inProgressStatus
            }
            else {
                inventory.quantity = inventory.quantity - requestItem.quantity
                requestItem.satisfiedQuantity = requestItem.quantity
                requestItem.unSatisfiedQuantity = 0

                requestItem.status = demandConstant.completedStatus
            }

            const transportationItem = {}
            transportationItem.product = requestItem.product
            transportationItem.customFields = requestItem.customFields
            transportationItem.quantity = requestItem.satisfiedQuantity

            transportation.transportationItems[index] = transportationItem

            await inventoryRepository.update(inventory._id, inventory)
        }

        await demandRepository.update(demand._id, demand)
        let result = await repository.create(transportation)
        transportation._id = result.insertedId;
    } catch (error) {
        throw error
    }

    return transportation
}

exports.approve = async (transportationId, userId) => {
    try {
        var transportation = await repository.getById(transportationId)
        await validation.isExist(transportation)
        await validation.isApproved(transportation)

        transportation.approvedUser = userId
        transportation.arrivingDate = timeHelper.nowFormatted

        await repository.update(transportationId, transportation)
    } catch (error) {
        throw error
    }

    return transportation
}