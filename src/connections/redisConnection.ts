import { createClient } from 'redis'
import 'dotenv/config'
import IORedis from 'ioredis'
let redisClient: any;
let redisPub: any;
let redisSub: any;

let redisData: any = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    pubSubDb: process.env.REDIS_PUB_SUB_DB
}

const redisConnection = async () => {
    try {
        redisClient = createClient(redisData)
        redisClient.connect()
        

        redisClient.on("connect", () => {
        console.log('>> Redis Connected !');
            redisClient.flushDb();
          });

        redisClient.on("error", (error: any) => {
            console.log(`Redis Connection ${error}`)
        })

        const pubSubOptions: any = {
            host: process.env.REDIS_PUB_SUB_HOST,
            port: process.env.REDIS_PUB_SUB_PORT,
            password: process.env.REDIS_PUB_SUB_PASSWORD,
            db: process.env.REDIS_PUB_SUB_DB
        }
        redisPub = new IORedis(pubSubOptions)
        redisSub = new IORedis(pubSubOptions)
        redisPub.on("error", (error: any) => {
            console.log(`Redis pub ${error}`)
        })

        redisPub.on("connect", () => {
            console.log('redis pub connection sucessfully..')
        })
        redisSub.on("error", (error: any) => {
            console.log(`Redis Sub ${error}`)
        })

        redisSub.on("connect", () => {
            console.log('redis Sub connection sucessfully..')
        })
    } catch (error: any) {
        console.log(`redis connection ${error}`)
    }
}

export { redisConnection, redisClient, redisPub, redisSub,redisData }
