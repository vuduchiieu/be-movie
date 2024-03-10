export const registerValidation = async (req, res, next) => {
  if (!req.body.username) throw new Error("username đang bị thiếu!");
  if (!req.body.email) throw new Error("email đang bị thiếu!");
  if (!req.body.password) throw new Error("password đang bị thiếu!");
  next();
};
