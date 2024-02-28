import { Request, Response, Router } from "express";

class AuthController {
    router: Router;
   
    public async iniciarSesion(req: Request, res: Response) {
        const {email, password} = req.body;
        return res.json({ message : "Autenticación correcta",
            email: email,
            password: password 
        });
    }

    config() {
        this.router.post('/', authController.iniciarSesion);        
    }
 
}
const authController = new AuthController();
export default authController;