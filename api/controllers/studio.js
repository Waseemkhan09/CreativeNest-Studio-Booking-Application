import Studio from "../models/Studio.js";

export const createStudio = async (req, res, next) => {
  const newStudio = new Studio(req.body);

  try {
    const savedStudio = await newStudio.save();
    res.status(200).json(savedStudio);
  } catch (err) {
    next(err);
  }
}

export const updateStudio = async (req, res, next) => {
  try {
    const updatedStudio = await Studio.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedStudio);
  } catch (err) {
    next(err);
  }
}

export const deleteStudio = async (req, res, next) => {
  try {
    await Studio.findByIdAndDelete(
     req.params.id
   );
   res.status(200).json("Studio has been deleted");
  } catch (err) {
    next(err);
  }
}

export const getStudio = async (req, res, next) => {
  try {
    const studio = await Studio.findById(
      req.params.id
    )
    res.status(200).json(studio);
  } catch (err) {
    next(err);
  }
}
/*
export const getStudios = async (req, res, next) => {
  try {
    const Studios = await Studio.find(req.query).limit(req.query.limit);
    res.status(200).json(Studios);
  } catch (err) {
    next(err);
  }
}
*/
export const getStudios = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  const limit = parseInt(req.query.limit);
  try {
    const Studios = await Studio.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(limit);
    res.status(200).json(Studios);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Studio.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const photographyCount = await Studio.countDocuments({ type: "photography" });
    const videographyCount = await Studio.countDocuments({ type: "videography" });
    const recordingCount = await Studio.countDocuments({ type: "recording" });
    const creativeCount = await Studio.countDocuments({ type: "creative" });
    const danceCount = await Studio.countDocuments({ type: "dance" });

    res.status(200).json([
      { type: "photography", count: photographyCount },
      { type: "videography", count: videographyCount },
      { type: "recording", count: recordingCount },
      { type: "creative", count: creativeCount },
      { type: "dance", count: danceCount },
    ]);
  } catch (err) {
    next(err);
  }
};

