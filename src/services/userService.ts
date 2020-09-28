import { User } from "../domain/user";
const db = require('../db/models/index');

export const getUserById = (id: number) :Promise<User> => {
    return new Promise ((resolve, reject) => {
        db.user.findOne({ where: {id: id }}).then((res: User) => {
            if(!res) {
                reject('User not found')
            } else {
                resolve(res)
            }
        }).catch((err: any) => {
            if(!err) {
                reject('User not found')
            } else {
                reject(err)
            }
        })
    })
};

export const createUser = (userJson: any) :Promise<User> => {
    return new Promise((resolve, reject) => {
        if (!userJson || !userJson.userName || userJson.userName.length < 1) {
            reject('Username cannot be empty')
        } else {
            db.user.create({
                userName: userJson.userName
            }).then((res: User) => {
                resolve(res)
            }).catch((err: any) => {
                reject(err)
            })
        }
    })
}

