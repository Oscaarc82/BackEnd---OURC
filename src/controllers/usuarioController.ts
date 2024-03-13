import { Request, Response } from "express";
import validator from "validator";
import { utils } from "../utils/utils";
import  model  from "../models/authModelo";


class UsuarioController {


  public async list(req: Request, res: Response) {
    try {
      return res.json({ message: "Listado de Usuario", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async add(req: Request, res: Response) {
    try {
      const usuario = req.body

      const vali = model.getuserByEmail(usuario.email);
      if (vali != null) {
        var encryptedText = await utils.hashPassword(usuario.passwd);
        usuario.passwd = encryptedText;

        return res.json({ message: usuario.passwd, code: 0 });
      }
      
      return res.json({ message: "Error", code: 0});          

    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async update(req: Request, res: Response) {
    try {
      const usuario = req.body

      const vali = model.getuserByEmail(usuario.email);

      if (vali != null) {
        var encryptedText = await utils.hashPassword(usuario.passwd);
        usuario.passwd = encryptedText;

        return res.json({ message: usuario.passwd, code: 0 });
      }
      
      return res.json({ message: "Error", code: 0});  

    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async delete(req: Request, res: Response) {
    try {
      const usuario = req.body;
      const vali = model.getuserByEmail(usuario.email);

      if (vali != null) {
        var encryptedText = await utils.hashPassword(usuario.passwd);
        usuario.passwd = encryptedText;
        
        return res.json({ message: usuario.passwd, code: 0 });
      }
      
      return res.json({ message: "Error", code: 0});  
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
}
export const usuarioController = new UsuarioController();
