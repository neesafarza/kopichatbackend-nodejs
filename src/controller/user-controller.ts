import { RequestHandler } from "express";
import { User } from "../domain/user";
import { getUserById } from "../services/userService";

export const getUser = (req: any, res: any): void => {
    const userId = req.params.id;
    const user = getUserById(userId);

    if (!user) {
        res.status(400);
        res.send({
            message: 'User not found'
        })
    } else {
        res.status(200);
        res.send(user);
    }
}