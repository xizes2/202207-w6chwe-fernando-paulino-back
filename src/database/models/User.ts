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
