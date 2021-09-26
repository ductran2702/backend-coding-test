import './src/boilerplate.polyfill';

//import { SnakeNamingStrategy } from './src/snake-naming.strategy';

console.log(
  '🚀 ~ file: ormconfig.ts ~ line 16 ~ process.env.DB_USERNAME',
  process.env.DB_USERNAME,
);
module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  //namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
};
