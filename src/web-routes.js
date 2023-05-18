import { accountsController } from "./controllers/accounts-controller.js";
import { placesController } from "./controllers/places-controller.js";
import { placeDetailController } from "./controllers/places-details-controller.js";
import { admindashboardController } from "./controllers/admin-dashboard-controller.js";


export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/edituser/{userid}", config: accountsController.edit },
  { method: "POST", path: "/updateuser/{userid}", config: accountsController.update },

  { method: "GET", path: "/user-view/{userid}", config: accountsController.edit },
  
  // { method: "POST", path: "/updateuser/{userid}", config: accountsController.update },

  
  { method: "GET", path: "/admindashboard", config: admindashboardController.index },
  { method: "POST", path: "/admindashboard/adduser", config: admindashboardController.addUser },
  { method: "GET", path: "/admindashboard/deleteuser/{id}", config: admindashboardController.deleteUser },
  
  { method: "GET", path: "/admindashboard/adminedituser/{id}", config: admindashboardController.admineditUser },
  { method: "POST", path: "/admindashboard/adminupdateuser/{id}", config: admindashboardController.adminupdateUser },




  { method: "GET", path: "/place", config: placesController.index },
  { method: "POST", path: "/place", config: placesController.place },
  { method: "GET", path: "/report", config: placesController.report },


  { method: "GET", path: "/place/{id}/editplace/{placeid}", config: placeDetailController.index },
  { method: "POST", path: "/place/{id}/updateplace/{placeid}", config: placeDetailController.update },

  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false },
  },
];
