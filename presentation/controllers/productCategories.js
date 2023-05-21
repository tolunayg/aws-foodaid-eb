const productCategoryService = require('../../service/productCategory.js');

exports.getAll = async (req, res) => {
  try {
    const productCategories = await productCategoryService.getAll();
    res.status(200).json(productCategories);
  } catch (err) {
    console.error(err);

    if (err.isBusinessException == false) {
      err.statusCode = 500
      err.message = 'Server Error'
    }

    res.status(err.statusCode).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const productCategory = await productCategoryService.getById(req.params.id);

    res.status(200).json(productCategory);
  } catch (err) {
    console.error(err);

    if (err.isBusinessException == false) {
      err.statusCode = 500
      err.message = 'Server Error'
    }

    res.status(err.statusCode).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const inserted = await productCategoryService.create(req.body);
    res.status(201).json(inserted);
  } catch (err) {
    console.error(err);

    if (err.isBusinessException == false) {
      err.statusCode = 500
      err.message = 'Server Error'
    }

    res.status(err.statusCode).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedProduct = await productCategoryService.update(req.params.id, req.body)
    res.status(200).json(updatedProduct.value);
  } catch (err) {
    console.error(err);

    if (err.isBusinessException == false) {
      err.statusCode = 500
      err.message = 'Server Error'
    }

    res.status(err.statusCode).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await productCategoryService.delete(req.params.id)
    res.status(200).json({ message: 'Product Category is deleted successfully' });
  } catch (err) {
    console.error(err);

    if (err.isBusinessException == false) {
      err.statusCode = 500
      err.message = 'Server Error'
    }

    res.status(err.statusCode).json({ message: err.message });
  }
};

