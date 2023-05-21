const productCategoryRepository = require('../repository/productCategory.js')
const productCategoryValidation = require('./validations/productCategoryValidation.js')

exports.getAll = async () => {
    return await productCategoryRepository.getAll();
}

exports.getById = async (id) => {
    let product = await productCategoryRepository.getById(id)
    try {
        await productCategoryValidation.isExist(product)
    } catch (error) {
        throw error
    }

    return product
}

exports.create = async (productCategory) => {
    try {
        await productCategoryValidation.insertValidations(productCategoryRepository, productCategory._id)
    } catch (error) {
        throw error
    }

    let result = await productCategoryRepository.create(productCategory)
    productCategory._id = result.insertedId;

    return productCategory
}

exports.update = async (id, productCategory) => {
    try {
        let updated = await productCategoryRepository.update(id, productCategory)
        await productCategoryValidation.isExist(updated.value)
    } catch (error) {
        throw error
    }

    return true;
}

exports.delete = async (id) => {
    try {
        let deleted = await productCategoryRepository.delete(id)
        await productCategoryValidation.isExist(deleted.value)
    } catch (error) {
        throw error
    }
    return true
} 