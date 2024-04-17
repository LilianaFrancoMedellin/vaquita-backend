import pg from 'pg'
const { Pool } = pg
const pool = new Pool({
    // same as
    // user: process.env.PGUSER,
    // host: process.env.PGHOST,
    // database: process.env.PGDATABASE,
    // password: process.env.PGPASSWORD,
    // port: process.env.PGPORT,
})

const requireTransactionMap = {
    POST: true,
    PUT: true,
}

/**
 * Wrap an async controller to handle db conection and transaction.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const transactionalDecorator = (controllerFn) => {
    return async (req,res) => {
        // resolve db client
        let dbClient = null;
        try {
            dbClient = await pool.connect();
        } catch (err) {
            res.status(503).end();
            return;
        }

        const doTransaction = requireTransactionMap[req.method] === true;
        const debugTag = `Process: ${req.originalUrl}`;
        // try controller
        try {
            console.group(debugTag);
            if (doTransaction){
                console.info('begin transaction');
                await dbClient.query('BEGIN');
            }
            await controllerFn(req,res,dbClient);
            if (doTransaction){
                console.info('commit transaction');
                await dbClient.query('COMMIT');
            }
        } catch(err) {
            if (doTransaction){
                console.info('rollback transaction!');
                await dbClient.query('ROLLBACK');
            }
            console.info('--- ERROR ---');
            console.error(err);
            // need a way to detect app error from system error
            let errorCode = 500;
            if (err.isApplicationError === true) {
                errorCode = err.errorCode;
            }
            res.status(errorCode).json({
                error: err.message || "Cant process your request",
            });
        } finally {
            if (dbClient) {
                dbClient.release();
            }
            console.groupEnd(debugTag);
        }
    }
}

export default transactionalDecorator;