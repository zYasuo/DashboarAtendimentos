// pages/api/Chamados.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { createDatabaseConnection } from '../utils/db/dbConfig';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const connection = await createDatabaseConnection();

        // Consulta para obter todas as filiais
        const [rows] = await connection.query('SELECT id, assunto FROM assunto');

        res.status(200).json(rows);
    } catch (err) {
        console.error(err); // Logging the error can help during debugging
        res.status(500).json({ error: 'Unable to fetch filiais' });
    }

}

export default handler;
