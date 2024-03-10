import { Movie } from "../model/movideModel.js";

const sortedController = {
  year: async (req, res) => {
    const movies = await Movie.find();
    const sorted = movies.sort((a, b) => a.year - b.year);
    res.json(sorted);
    try {
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export { sortedController };
