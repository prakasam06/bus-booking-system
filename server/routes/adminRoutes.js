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
const { checkAdmin } = require("../middlewares/checkAdmin");

AdminRouter.post("/addAdmin", verifyJWT, checkAdmin, addAdmin);

AdminRouter.post("/addbus", verifyJWT, checkAdmin, addBus);
AdminRouter.post("/editBus/:busId", verifyJWT, checkAdmin, editBus);
AdminRouter.get("/busDetails/:busId", verifyJWT, busDetails);

AdminRouter.post("/addpath", verifyJWT, checkAdmin, addPath);
AdminRouter.post("/editpath/:pathId", verifyJWT, checkAdmin, editPath);
AdminRouter.get("/pathdetails/:pathId", verifyJWT, pathDetails);

module.exports = { AdminRouter };
