import * as process from 'process';

export type Config = {
    port: number;
    databaseConfig: DatabaseConfig;
};

type DatabaseConfig = {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
};

export default (): Config => ({
    port: parseInt(process.env.APP_PORT, 10),
    databaseConfig: {
        type: 'postgres',
        host: process.env.RDS_HOSTNAME || 'localhost',
        port: parseInt(process.env.RDS_PORT, 10) || 5432,
        username: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DB_NAME,
    },
});
