import { db } from "../models/db.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("Main", { title: "Welcome to Playlist" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("Signup", { title: "Sign up for Playlist" });
    },
  },
  signup: {
    auth: false,
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("Login", { title: "Login to Playlist" });
    },
  },
  login: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/place");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },
  edit: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.userid);
      const viewData = {
        title: "Edit User",
        user: user,
      };
      return h.view("user-view", viewData);
      
    },
  },
  update: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.userid);
      const newUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
        admin: request.payload.admin,
      };
      await db.userStore.updateUser(user, newUser);
      const viewData = {
        title: "User updated",
        user,
      };
      return h.view("user-view", viewData).redirect(`/user-view/${user._id}`);
    },
  },

};
