import { Movie } from "../model/movideModel.js";
import { cloudinary } from "../utils/uploader.js";

const movieController = {
  getAllmovie: async (req, res) => {
    const allMovies = await Movie.find();
    res.status(200).send({ allMovies });
  },
  createMovie: async (req, res) => {
    const { name, time, year, introduce } = req.body;
    const file = req.file;
    const dataUrl = `data:${file.mimetype};base64,${file.buffer?.toString(
      "base64"
    )}`;
    const fileName = file.originalname.split(".")[0];
    const uploaded = await cloudinary.uploader.upload(dataUrl, {
      _id: fileName,
      _type: "image",
    });
    await Movie.create({
      name,
      time,
      year,
      image: {
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
      },
      introduce,
    });
    res.status(201).send(`Phim ${name} đăng tải thành công!`);
  },
  updateMovie: async (req, res) => {
    try {
      const { movieId } = req.params;
      const { name, time, year, introduce } = req.body;
      const file = req.file;
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ error: "Phim không tồn tại" });
      }
      if (file) {
        const dataUrl = `data:${file.mimetype};base64,${file.buffer?.toString(
          "base64"
        )}`;
        const fileName = file.originalname.split(".")[0];
        await cloudinary.uploader.destroy(movie.image.publicId);
        const uploaded = await cloudinary.uploader.upload(dataUrl, {
          public_id: fileName,
          resource_type: "image",
        });

        movie.image.url = uploaded.secure_url;
        movie.image.publicId = uploaded.public_id;
      }
      if (name) {
        movie.name = name;
      }
      if (time) {
        movie.time = time;
      }
      if (year) {
        movie.year = year;
      }
      if (introduce) {
        movie.introduce = introduce;
      }
      await movie.save();

      res.status(201).send("Cập nhật phim thành công!");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình cập nhật phim!" });
    }
  },
  removeMovie: async (req, res) => {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Phim không tồn tại" });
    }
    await cloudinary.uploader.destroy(movie.image.publicId);
    await Movie.findByIdAndDelete(movieId);
    res.status(201).send("Xóa phim thành công!");
  },
};

export { movieController };
