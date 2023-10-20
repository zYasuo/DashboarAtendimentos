import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { RowDataPacket } from 'mysql2/promise';
import { createDatabaseConnection } from '../utils/db/dbConfig';

type UserType = {
    id: number;
    email: string;
    nome: string;
};

import { Connection } from 'mysql2/promise';

const findUserByFirebaseUid = async (connection: Connection, firebaseUid: string): Promise<UserType | null> => {
    const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM usuarios WHERE firebase_uid = ?', [firebaseUid]);
    if (rows.length === 0) return null;
    return rows[0] as UserType;
};

const createUser = async (connection: Connection, userDetails: { firebaseUid: string, email: string, name: string }): Promise<UserType> => {
    const [result] = await connection.query<any>('INSERT INTO usuarios (firebase_uid, email, nome) VALUES (?, ?, ?)', [userDetails.firebaseUid, userDetails.email, userDetails.name]);
    if (!result.insertId) throw new Error('Failed to retrieve insertId after user creation.');
    return { id: result.insertId, email: userDetails.email, nome: userDetails.name };
};

const UsuarioGoogle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { id, email, name } = req.body;

    if (!id || !email || !name) return res.status(400).json({ error: 'Campos obrigatórios ausentes' });

    try {
        const connection = await createDatabaseConnection();
        let user = await findUserByFirebaseUid(connection, id);

        // Se o usuário não existir, crie-o
        if (!user) user = await createUser(connection, { firebaseUid: id, email, name });

        const token = jwt.sign({ userId: user.id, nome: user.nome }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return res.json({ success: true, token, userId: user.id, nome: user.nome });

    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default UsuarioGoogle;
