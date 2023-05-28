exports.isExist = async (entity) => {
    if (!entity) {
        let error = new Error(`Collection Point not found`)
        error.name = "CollectionPointNotFound"
        error.statusCode = 404
        error.isBusinessException = true
        throw error
    }
}