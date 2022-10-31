import dotenv from 'dotenv'
dotenv.config()

const config = {
    port: Number(process.env.PORT) || 5000,
    databaseUri: process.env.MONGODB_URI as string,
    saltRounds: Number(process.env.SALT_ROUNDS),
    secretPassword: process.env.SECRET_PASSWORD as string
}

export default config