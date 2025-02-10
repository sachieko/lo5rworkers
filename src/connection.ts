import { Client } from 'pg';

import { Env } from './index';

type TConfig = {
	env: Env;
	ctx: ExecutionContext;
};

export const db = {
	query: async (text: string, dbEnv: Env, params?: string[] | undefined): Promise<any> => {
		const client = new Client({
			user: dbEnv.DB_USER,
			password: dbEnv.DB_PW,
			host: dbEnv.DB_HOST,
			// port: dbEnv.DB_PORT,
			database: dbEnv.DB_USER,
		});
		await client.connect();
		try {
			return await client.query(text, params);
		} catch (error) {
			console.error(error);
		}
	},
};
