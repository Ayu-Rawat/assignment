import { Router } from "express";
import { login,signup } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route('/register').post(signup);
userRouter.route('/login').post(login);

export default userRouter