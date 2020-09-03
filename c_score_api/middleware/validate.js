module.exports = validater => {
  return (req, res, next) => {
    const { error } = validater(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    next();
  };
};
