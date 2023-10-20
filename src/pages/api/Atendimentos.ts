// pages/api/Atendimentos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createDatabaseConnection } from '../utils/db/dbConfig';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { usuario_id } = req.query;

    if (!usuario_id) {
        return res.status(400).json({ error: 'O ID do usuário é obrigatório.' });
    }

    try {
        const connection = await createDatabaseConnection();
        const [rows] = await connection.query(
            'SELECT id, nome, filial, assunto, dataAbertura, filial_id FROM atendimentonoc WHERE usuario_id = ?',
            [usuario_id]
        );
        return res.json(rows);
    } catch (err) {
        return res.status(500).json({ error: 'Unable to fetch atendimentos' });
    }
}

export default handler;
