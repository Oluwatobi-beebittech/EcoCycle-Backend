import { RailwayConfig } from './railway.config';

const IS_PROD = JSON.parse(process.env.IS_PROD);
export const EnvConfig = IS_PROD ? RailwayConfig : process.env;
