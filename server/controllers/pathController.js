const mongoose = require("mongoose");
const Path = require("../models/pathModel");

const addPath = async (req, res) => {
  const { departure, destination } = req.body;
  if (departure == destination)
    return res
      .status(400)
      .send({ status: 400, message: "departure and destination cant be same" });
  const isPath = await Path.findOne({
    departure: req.body.departure,
    destination: req.body.destination,
  });
  if (isPath)
    return res.status(400).send({
      status: 400,
      message: `A path same as this already exists - ${isPath.id}`,
    });

  const path = await Path.create(req.body);
  return res
    .status(200)
    .send({ status: 200, message: "Path created successfully" });
};

const editPath = async (req, res) => {
  const pathId = req.params.pathId;
  const body = req.body;
  if (!req.body.action)
    res.status(400).send({ status: 400, message: "action is required" });
  if (req.body.action == "edit") {
    const { departure, destination } = req.body;
    if (departure == destination)
      return res.status(400).send({
        status: 400,
        message: "departure and destination cant be same",
      });
    const isPath = await Path.findOne({
      departure: req.body.departure,
      destination: req.body.destination,
    });
    if (isPath)
      return res.status(400).send({
        status: 400,
        message: `A path same as this already exists - ${isPath.id}`,
      });
    const newPath = await Path.findOneAndUpdate(
      { _id: pathId },
      { $set: body },
      { new: true }
    );
    console.log(newPath.destination);
    return res
      .status(200)
      .send({ status: 200, message: "path edited sucessfully" });
  } else if (req.body.action == "delete") {
    const deletedPath = await Path.findByIdAndDelete(pathId);
    if (!deletedPath)
      return res.status(400).send({ message: "path not found" });
    return res.status(200).send({ message: "deleted successfully" });
  }
};

const pathDetails = (req, res) => {
  const pathId = req.params.pathId;
  try {
    const path = Path.findById(pathId);
    if (!path)
      return res.status(400).send({ status: 400, message: "no path found" });
    return res.status(200).send({ status: 200, details: path });
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "error occured", error: err.toString() });
  }
};

module.exports = { addPath, editPath, pathDetails };
