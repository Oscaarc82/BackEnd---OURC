import pool from '../config/connection';

class AuthModelo { 
    public async getuserByEmail(email: string) {
        let query = "SELECT * FROM tbl_usuario WHERE email='" + email + "'"
        const result = await pool.then(async (connection) => {
            return await connection.query(query);
        });

        if (Object.keys(result).length === 0) {
            return null;
        }

        return result;
    }
}
const model = new AuthModelo();
export default model;
