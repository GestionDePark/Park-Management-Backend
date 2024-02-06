import process from 'process';

export type Config = {
    port: number;
    // databaseConfig: DatabaseConfig;
    secret: string;
};

// type DatabaseConfig = {
//     dialect: Dialect;
//     host: string;
//     port: number;
//     username: string;
//     password: string;
//     database: string;
// };

export default (): Config => ({
    port: parseInt(process.env.APP_PORT, 10) || 8080,
    secret: process.env.APP_SECRET || '',
    //     databaseConfig: {
    //         dialect: (process.env.DATABASE_DIALECT as Dialect) || 'postgres',
    //         host: process.env.DATABASE_HOST || 'localhost',
    //         port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    //         username: process.env.DATABASE_USERNAME,
    //         password: process.env.DATABASE_PASSWORD,
    //         database: process.env.DATABASE_NAME,
    //     },
});
