const service = require('../../service/user.js');

exports.getAll = async (req, res) => {
    try {
      const users = await service.getAll();
      res.status(200).json(users);
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
    const user = await service.getById(req.params.id);

    res.status(200).json(user);
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
    const inserted = await service.create(req.body);
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
    const updated = await service.update(req.params.id, req.body)
    res.status(200).json(updated.value);
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
    await service.delete(req.params.id)
    res.status(200).json({ message: 'User is deleted successfully' });
  } catch (err) {
    console.error(err);

    if (err.isBusinessException == false) {
      err.statusCode = 500
      err.message = 'Server Error'
    }

    res.status(err.statusCode).json({ message: err.message });
  }
};