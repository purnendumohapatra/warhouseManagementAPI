module.exports = (asyncfunction) => {
  return (req, res, next) => {
    asyncfunction(req, res, next).catch((err) => {
      next(err);
    });
  };
};
