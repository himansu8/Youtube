import 'dotenv/config'


const config = {
    MONGO_URL : process.env.MONGODB_URI,
    PRIVATE_KEY:process.env.PRIVATE_KEY,
}
export default config;