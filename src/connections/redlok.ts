import Redlock from "redlock";
import dotenv from 'dotenv'
import IORedis from 'ioredis'

dotenv.config({
    path: "./.env"
})

let redLock: any;

const redlockConnection = async () => {
    try {
        const redisoptions: any = {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
            DB: process.env.REDIS_DB
        }

        const redisClient = new IORedis(redisoptions)

        redLock = new Redlock([redisClient as any], {
            driftFactor: 0.01,
            retryCount: 10,
            retryDelay: 20,
            retryJitter: 20
        })
    } catch (error: any) {
        console.log("redlockConnection ERROR", error)
    }
}
    
const applyRedlock = async (lockid: string) => {
    try {
        let lock = await redLock.acquire([lockid], 2000)
        return lock
    } catch (error: any) {
        console.log("applyRedlock ERROR", error)
    }
}

const releaseLock = async (lock: any) => {
    try {
        await lock.release()
    } catch (error: any) {
        console.log("releaseLock ERROR", error)
    }
}

export { redlockConnection, applyRedlock, releaseLock }
