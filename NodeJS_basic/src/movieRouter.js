import express from "express";
import { home,getUpload,postUpload, search, see, getEdit, postEdit,deleteMovie } from "./movieController";

const movieRouter = express.Router();

// Add your magic here!

movieRouter.route("/").get(home)
movieRouter.route("/upload").get(getUpload).post(postUpload);
movieRouter.route("/search").get(search);
movieRouter.route("/movies/:id").get(see);
movieRouter.route("/movies/:id/edit").get(getEdit).post(postEdit);
movieRouter.route("/movies/:id/delete").get(deleteMovie);

export default movieRouter;
