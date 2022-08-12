import "./dotenv";
import connectDataBase from "./database";

const DBurl = process.env.MONGOURL as string;

connectDataBase(DBurl);
