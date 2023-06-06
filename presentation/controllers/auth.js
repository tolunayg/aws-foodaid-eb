const service = require('../../service/auth.js');

exports.login = async (req, res) => {
  try {
    const tokenRes = await service.login(req.body);
    res.status(200).json(tokenRes);
  } catch (err) {
    console.error(err);

    if (err.isBusinessException == false) {
      err.statusCode = 500
      err.message = 'Server Error'
    }

    res.status(err.statusCode).json({ message: err.message });
  }
};
