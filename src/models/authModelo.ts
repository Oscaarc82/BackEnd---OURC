import pool from '../config/connection';

class AuthModelo {
 
    public async getuserByEmail(email: string) {
        let query = "SELECT * FROM tbl_usuario WHERE email='" + email + "'"
        const result = await pool.then(async (connection) => {
            return await connection.query(query);
        });
        return result;
    }
}
const model = new AuthModelo();
export default model;
