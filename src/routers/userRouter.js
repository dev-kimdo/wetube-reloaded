import express from "express";
import User from "../models/User";
import  {edit, remove, logout, see, startGithubLogin, finishGithubLogin} from "../controllers/userController";


const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;