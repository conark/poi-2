import { db } from "../models/db.js";

export const placesController = {
  index: {
    handler: async function (request, h) {
      const counties = await db.countyStore.getAllCounties();
      return h.view("Place", { title: "Make a Place", counties: counties});
    },
  },
  user: {
    handler: async function (request, h) {
      const viewData = {
        user: loggedInUser,
      };
      return h.view("Place",viewData);
    },
  },
  report: {
    handler: async function (request, h) {
      const places = await db.placeStore.getAllPlaces();
      // let total = 0;
      // places.forEach((place) => {
      //   total += place.amount;
      // });
      return h.view("Report", {
        title: "Favorite Walk Trail",
        places: places,
      //  total: total,
      });
    },
  },
  place: {
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const rawCounty = request.payload.county.split(",");
        const county = await db.countyStore.findByName(rawCounty[0], rawCounty[1]);
        const { lat, lng } = request.payload;
        await db.placeStore.place(request.payload.placename, request.payload.description,request.payload.category, loggedInUser._id, county._id,lat, lng);
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
};
