import { model, Schema } from "mongoose";

const robotSchema = new Schema({
  name: { type: String, required: true },
  skills: {
    speed: { type: Number, required: true },
    endurance: { type: Number, required: true },
    creationDate: { type: String },
  },
  img: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" }, // Aqui estamos vinculando los robots creados al user que lo ha creado. La ref es la referencia de la collection de la cual queremos coger el id. CADA ROBOT TIENE SOLO UNO OWNER, por eso es un objecto y no un array.
});

const Robot = model("Robot", robotSchema, "robots");

export default Robot;
