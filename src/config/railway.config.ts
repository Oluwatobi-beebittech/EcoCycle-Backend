export type DbConfig = {
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
};

export const RailwayConfig: DbConfig = {
  DB_HOST: process.env.MYSQLHOST,
  DB_PORT: process.env.MYSQLPORT,
  DB_USER: process.env.MYSQLUSER,
  DB_PASSWORD: process.env.MYSQLPASSWORD,
  DB_DATABASE: process.env.MYSQLDATABASE,
};