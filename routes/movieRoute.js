import { Router } from "express";
import { uploader } from "../utils/uploader.js";
import { asyncCatch } from "../utils/asyncCatch.js";
import { movieController } from "../controller/movieController.js";
import { movieValidation } from "../validation/movieValidation.js";

const movieRoute = Router();

movieRoute.get("/", asyncCatch(movieController.getAllmovie));

movieRoute.post(
  "/",
  uploader.single("image"),
  asyncCatch(movieValidation),
  asyncCatch(movieController.createMovie)
);

movieRoute.put(
  "/:movieId",
  uploader.single("image"),
  asyncCatch(movieController.updateMovie)
);

movieRoute.delete("/:movieId", asyncCatch(movieController.removeMovie));

export default movieRoute;
