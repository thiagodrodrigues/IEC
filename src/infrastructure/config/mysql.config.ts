import 'dotenv/config';

const mySqlConfig = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: 'mysql'
}

if(process.env.NODE_ENV === 'production'){
    Object.assign(
        mySqlConfig,
        {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
    )
}

export default mySqlConfig;

module.exports = mySqlConfig;