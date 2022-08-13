import { model, Schema } from "mongoose";

const robotSchema = new Schema({
  name: { type: String, required: true },
  speed: { type: Number, required: true },
  endurance: { type: Number, required: true },
  creationDate: { type: String },
});

const Robot = model("Robot", robotSchema, "Robot");

export default Robot;
