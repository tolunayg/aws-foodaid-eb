exports.insertValidations = async (repository, demandId) => {
    var demandIsSatisfied = await checkDemandIsSatisfied(repository, demandId)
    if (demandIsSatisfied == true) {
        let error = new Error(`Demand is already satisfied`)
        error.name = "DemandIsSatisfied"
        error.statusCode = 400
        error.isBusinessException = true
        throw error
    }
}

exports.isExist = async (entity) => {
    if (!entity) {
        let error = new Error(`Transportation not found`)
        error.name = "TransportationNotFound"
        error.statusCode = 404
        error.isBusinessException = true
        throw error
    }
}

exports.isApproved = async (entity) => {
    if (entity.approvedUser || entity.arrivingDate) {
        let error = new Error(`Transportation is already approved`)
        error.name = "TransportationAlreadyApproved"
        error.statusCode = 404
        error.isBusinessException = true
        throw error
    }
}

checkDemandIsSatisfied = async (repository, demandId) => {
    var transportation = await repository.getByDemandId(demandId)
    return transportation != null ? true : false
}