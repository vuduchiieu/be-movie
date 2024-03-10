import { Router } from "express";
import { asyncCatch } from "../utils/asyncCatch.js";
import { authController } from "../controller/authController.js";
import { registerValidation } from "../validation/userValidation.js";

const authRoute = Router();

authRoute.post(
  "/register",
  asyncCatch(registerValidation),
  asyncCatch(authController.register)
);
authRoute.post("/login", asyncCatch(authController.login));
authRoute.post("/logout", asyncCatch(authController.logout));
authRoute.get("/users", asyncCatch(authController.getUsers));
authRoute.get("/user/:id", asyncCatch(authController.getUser));
authRoute.put("/user/:id", asyncCatch(authController.updateUser));
authRoute.delete("/user/:id", asyncCatch(authController.deleteUser));

export default authRoute;
