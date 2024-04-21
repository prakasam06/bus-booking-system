const express = require("express");
const AdminRouter = express.Router();
const { verifyJWT } = require("../middlewares/verifyJWT");
const { addBus, editBus, busDetails } = require("../controllers/busController");
const { addAdmin } = require("../controllers/adminController");
const {
  addPath,
  editPath,
  pathDetails,
} = require("../controllers/pathController");
const {
  addTrip,
  editTrip,
  tripDetails,
} = require("../controllers/tripController");
const { checkAdmin } = require("../middlewares/checkAdmin");

AdminRouter.post("/addAdmin", verifyJWT, checkAdmin, addAdmin);

AdminRouter.post("/addbus",  addBus);
AdminRouter.post("/editBus/:busId", verifyJWT, checkAdmin, editBus);
AdminRouter.get("/busDetails/:busId", verifyJWT, busDetails);

AdminRouter.post("/addpath", addPath);
AdminRouter.post("/editpath/:pathId", editPath);
AdminRouter.get("/pathdetails/:pathId", verifyJWT, pathDetails);

AdminRouter.post("/addtrip", addTrip);
AdminRouter.post("/edittrip/:tripId", editTrip);
AdminRouter.get("/tripdetails/:tripId", tripDetails);

module.exports = { AdminRouter };




