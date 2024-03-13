import { Request, Response, Router } from "express";
import validator from "validator";
import model from "../models/authModelo";
import { utils } from "../utils/utils";
import jwt from 'jsonwebtoken';
import db from '../utils/database';

class AuthController {
    public async iniciarSesion(req: Request, res: Response) {
        try {
            const { email, passwd } = req.body;

            const lstUsers = await model.getuserByEmail(email);
            let result = utils.checkPassword(passwd, lstUsers[0].passwd);

            result.then((value) => {
                if (value) {
                    const newUser = {
                        email : lstUsers[0].email,
                        passwd : lstUsers[0].passwd
                    }
                    console.log(process.env.SECRET)
                    const env = require('dotenv').config();
                    let token = jwt.sign(newUser, process.env.SECRET, {expiresIn : '1h'})
                    return res.json({ message : "Autenticación correcta", code : 0});
                } else {
                    return res.json({ message : "Password incorrecto", code : 1});
                }
            })
            if (lstUsers.length <= 0) {
                return res
                    .status(404)
                    .json({
                        message: "El usuario y/o contraseña es incorrecto",
                        code: 1,
                    });
            }
            console.log(lstUsers[0].email, lstUsers[0].passwd)
            return res.json({ message : "Autenticación correcta", code : 0});
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }
}
const authController = new AuthController();
export default authController;
