import connectDataBase from "./database";
import "./dotenv";
import robotsRouter from "./server/router/robotsRouter";
import { startServer, app } from "./server/startServer";

const PORT = process.env.PORT ?? 4020;
// const mongoUrl = process.env.MONGOURL;

(async () => {
  try {
    await connectDataBase(
      "mongodb+srv://approbots:approbots@cluster0.kizme5e.mongodb.net/robots"
    );
    await startServer(+PORT);
  } catch {
    process.exit(1);
  }
})();
app.use("/robots", robotsRouter);
