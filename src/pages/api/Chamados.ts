// pages/api/Chamados.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { createDatabaseConnection } from '../utils/db/dbConfig';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { usuario_id } = req.query;

    if (!usuario_id) {
        res.status(400).json({ error: 'O ID do usuário é obrigatório.' });
        return;
    }

    try {
        const connection = await createDatabaseConnection();

        const [rows] = await connection.query(
            'SELECT id, tipo, assunto, grau, tecnicoCadastro, dataAbertura, dataSolucao FROM chamados WHERE usuario_id = ?',
            [usuario_id]
        );
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch chamados' });
    }

}

export default handler;
