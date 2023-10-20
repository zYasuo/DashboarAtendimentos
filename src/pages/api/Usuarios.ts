import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { RowDataPacket } from 'mysql2/promise';
import { createDatabaseConnection } from '../utils/db/dbConfig';

const validateInput = (email: any, password: any): boolean => {
    return typeof email === 'string' && typeof password === 'string' && email.length > 0 && password.length > 0;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!validateInput(email, password)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        const connection = await createDatabaseConnection();
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password]);

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }

        const user = rows[0];
        const token = jwt.sign({ userId: user.id, nome: user.nome }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        console.log(`Usuário logado com sucesso! Token: ${token} | ID do usuário: ${user.id} | Nome do usuário: ${user.nome}`);

        return res.json({ success: true, token, userId: user.id, nome: user.nome });

    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default handler;
