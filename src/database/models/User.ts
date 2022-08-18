import { model, Schema } from "mongoose";

export interface USerData {
  id: string;
  userName: string;
  image?: string;
  password: string;
}

// En un modelo real pediriamos nombre completo, direccion, email, etc etc
const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  robots: { type: [{ type: Schema.Types.ObjectId, ref: "Robots" }] }, // Aqui estamos vinculando al user los robots creados por él. La ref es la referencia de la collection de la cual queremos coger el id. CADA USER TIENE N ROBOTS, por eso es un array y no un objecto.
});

// Eso para que no se devuleva la password en el body del request.
// userSchema.set("toJSON", {
//   transform: (doc, ret) > {
//   const newDocument = {...ret}
//   delete newDocument.password
//   return newDocument
//   }
// })

const User = model("User", userSchema, "users" /* db collection name */);

export default User;
