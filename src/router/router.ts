import * as express from "express";
import { getUser } from "../controller/user-controller";


const router = express.Router();

router.get('/user/:id', getUser)
export { router }