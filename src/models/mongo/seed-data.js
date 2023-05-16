export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },
  counties: {
    _model: "County",
    waterford: {
      countyName: "Waterford",
      // lastName: "Simpson",
      // office: "President",
    },
    cork: {
      countyName: "Cork",
      // lastName: "Simpson",
      // office: "President",
    },
    dublin: {
      countyName: "Dublin",
    },
    galway: {
      countyName: "Galway",
    },
  },
  places: {
    _model: "Place",
    one: {
      placename: "River Lee",
      description: "blablablaaaaa",
      category: "riverside",
      lat: "52.160858",
      lng: "-7.152420",
      donor: "->users.bart",
      county: "->counties.cork",
    },
    two: {
      placename: "Bairon Bay Walk",
      description: "blalalalalala",
      category: "seaside",
      lat: "52.149220",
      lng: "-6.994620",
      donor: "->users.marge",
      county: "->counties.dublin",
    },
    three: {
      placename: "O'connell River",
      description: "blalalaloooooooo",
      category: "riverside",
      lat: "52.161290",
      lng: "-7.231540",
      donor: "->users.homer",
      county: "->counties.waterford",
    },
  },
};
