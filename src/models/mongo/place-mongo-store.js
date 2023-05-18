import { Place } from "./place.js";

export const placeMongoStore = {
  async getAllPlaces() {
    const places = await Place.find().populate("donor").populate("county").lean();
    return places;
  },

  async getPlacesByCounty(id) {
    const places = await Place.find({ county: id });
    return places;
  },
   async getPlaceById(id) {
    if (id) {
      const place = await Place.findOne({ _id: id }).lean();
      return place;
    }
    return null;
  },


  async place(placename,description, category, donor, county, lat, lng) {
    const newPlace = new Place({
      placename,
      category,
      description,
      donor: donor._id,
      county: county._id,
      lat,
      lng,
    });
    await newPlace.save();
    return newPlace;
  },

  async deleteAll() {
    await Place.deleteMany({});
  },
};
