import NodeCache from "node-cache"

const cache = new NodeCache()

const setCache = (key, value, duration) => {
  return cache.set(key, value, duration)
}

const getCache = (key) => {
  return cache.get(key)
}

const CacheService = {
  setCache,
  getCache
}

export default CacheService
