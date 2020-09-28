import { RequestHandler } from "express";
import { User } from "../domain/user";
import { getUserById, createUser } from "../services/userService";

export const getUser = async (req: any, res: any) => {

    try{
        const userId = req.params.id;
    const user = await getUserById(userId);
        res.status(200);
        res.send(user);
    } catch (e) {
        res.status(400);
        res.send({
            message: e
        })
    }
}

export const postUser = async (req: any, res: any) => {

    try{
        const userJson = req.body;
        const user = await createUser(userJson);
        res.status(200);
        res.send(user);
    }catch (e) {
        res.status(400);
        res.send({
            message: e
        })
    }
}