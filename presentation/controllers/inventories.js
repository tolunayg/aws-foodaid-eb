const service = require('../../service/inventory.js');

exports.getAll = async (req, res) => {
  try {
    const results = await service.getAll();
    res.status(200).json(results);
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
    const result = await service.getById(req.params.id);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);

    if (err.isBusinessException == false) {
      err.statusCode = 500
      err.message = 'Server Error'
    }

    res.status(err.statusCode).json({ message: err.message });
  }
};

exports.add = async (req, res) => {
  try {
    const result = await service.add(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);

    if (err.isBusinessException == false) {
      err.statusCode = 500
      err.message = 'Server Error'
    }

    res.status(err.statusCode).json({ message: err.message });
  }
};
