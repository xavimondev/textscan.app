import { Redis } from '@upstash/redis'

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

const redis =
  Boolean(UPSTASH_REDIS_REST_URL) && Boolean(UPSTASH_REDIS_REST_TOKEN)
    ? new Redis({
        url: UPSTASH_REDIS_REST_URL,
        token: UPSTASH_REDIS_REST_TOKEN
      })
    : undefined

export default redis
