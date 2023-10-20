// dbConfig.tsx

import mysql from 'mysql2/promise';

export const createDatabaseConnection = async () => {
    const connection = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    return connection;
};
