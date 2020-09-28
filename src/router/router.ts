import * as express from "express";
import { getUser, postUser } from "../controller/user-controller";


const router = express.Router();

router.get('/user/:id', getUser)
router.post('/user', postUser)
export { router }