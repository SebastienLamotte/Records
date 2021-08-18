module.exports = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (err) {
      if (err.path)
        return res.status(422).json({ error: { [err.path]: err.message } });

      next(err);
    }
  };
};
