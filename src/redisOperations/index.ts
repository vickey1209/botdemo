import { redisClient } from "../connections/redisConnection";

async function get(key: any) {
  console.log('key=================', key)
  let getData = await redisClient.get(key)
  console.log('redis getData', getData)
  getData = JSON.parse(getData)
  if (getData) {
    return getData
  }
  else {
    return false
  }
}

const set = async (key: string, data: any) => {
  try {
    console.log('set data ================>>', data)
    return await redisClient.set(key, JSON.stringify(data))
  } catch (error) {
    console.log('redis operation set ERROR', error);

  }
}

const del = async (key: string) => {
  try {
    console.log('del data ================>>', key)
    return await redisClient.del(key)
  } catch (error) {
    console.log('redis operation set ERROR', error);

  }
}

export { get, set, del }
