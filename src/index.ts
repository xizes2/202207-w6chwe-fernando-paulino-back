import cors from "cors";
import morgan from "morgan";
import connectDataBase from "./database";
import "./dotenv";
import robotsRouter from "./server/router/robotsRouter";
import { startServer, app } from "./server/startServer";

const PORT = process.env.PORT ?? 4050;
const mongoUrl = process.env.MONGOURL;

(async () => {
  try {
    await connectDataBase(mongoUrl);
    await startServer(+PORT);
  } catch {
    process.exit(1);
  }
})();
app.use(morgan("dev"));
app.use(cors());
app.use("/robots", robotsRouter);
