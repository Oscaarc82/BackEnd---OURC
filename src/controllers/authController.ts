import { Request, Response, Router } from "express";
import validator from "validator";
import model from "../models/authModelo";

class AuthController {
    public async iniciarSesion(req: Request, res: Response) {
        try {
            const { email, passwd } = req.body;

            const lstUsers = await model.getuserByEmail(email);
            if (lstUsers.length <= 0) {
                return res
                    .status(404)
                    .json({
                        message: "El usuario y/o contraseña es incorrecto",
                        code: 1,
                    });
            }
            return res.json({ message: "Autenticación correcta", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }
}
const authController = new AuthController();
export default authController;
