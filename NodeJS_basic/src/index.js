import "./db";
import "./models/Movie";
import express from "express";
import morgan from "morgan";
import movieRouter from "./movieRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(localsMiddleware);
app.use("/", movieRouter);

// Codesanbox does not need PORT :)
app.listen(() => console.log(`✅  Server Ready!`));

export default app;
