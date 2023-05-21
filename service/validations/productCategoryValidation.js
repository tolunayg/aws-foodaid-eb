exports.insertValidations = async (repository, productCategoryId) => {
    var productCategoryAlreadyExists = await checkIfAnyProductCategoryWithSameProductCategoryId(repository, productCategoryId)
    if (productCategoryAlreadyExists == true) {
        let error = new Error(`Product Category already exists`)
        error.name = "ProductCategoryAlreadyExists"
        error.statusCode = 400
        error.isBusinessException = true
        throw error
    }
}

exports.isExist = async (productCategory) => {
    if (!productCategory) {
        let error = new Error(`Product Category not found`)
        error.name = "ProductCategoryNotFound"
        error.statusCode = 404
        error.isBusinessException = true
        throw error
    }
}

checkIfAnyProductCategoryWithSameProductCategoryId = async (repository, productCategoryId) => {
    var productCategories = await repository.getAllById(productCategoryId)
    return productCategories?.length >= 1 ? true : false
}