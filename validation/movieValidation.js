export const movieValidation = async (req, res, next) => {
  if (!req.body.time) throw new Error("time đang bị thiếu");
  if (!req.body.introduce) throw new Error("introduce đang bị thiếu");
  if (!req.body.year) throw new Error("year đang bị thiếu");
  next();
};
