exports.insertValidations = async (repository, id) => {
    var distributionPointAlreadyExists = await checkIfAnydistributionPointWithSameid(repository, id)
    if (distributionPointAlreadyExists == true) {
        let error = new Error(`Distribution Point already exists`)
        error.name = "DistributionPointAlreadyExists"
        error.statusCode = 400
        error.isBusinessException = true
        throw error
    }
}

exports.isExist = async (distributionPoint) => {
    if (!distributionPoint) {
        let error = new Error(`Distribution Point not found`)
        error.name = "DistributionPointNotFound"
        error.statusCode = 404
        error.isBusinessException = true
        throw error
    }
}

checkIfAnydistributionPointWithSameid = async (repository, id) => {
    var distributionPoints = await repository.getAllById(id)
    return distributionPoints?.length >= 1 ? true : false
}