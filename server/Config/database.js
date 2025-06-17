import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });

import express from 'express';
import { Pool } from 'pg';

const app = express();
const router = express.Router();

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

export default pool;

// import dotenv from 'dotenv';
// dotenv.config({ path: 'config.env' }); // make sure this file exists in production

// import express from 'express';
// import { Pool } from 'pg';

// const app = express();
// const router = express.Router();

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// pool.connect()
//     .then(() => console.log('✅ Database connected successfully'))
//     .catch(err => console.error('❌ Database connection error:', err));

// export default pool;
