import { Pool } from "../deps.js";
import { config } from "../config/config.js";

const CONCURRENT_CONNECTIONS = 5;
const connectionPool = new Pool(config.database, CONCURRENT_CONNECTIONS);

let cache = {};

const executeQuery = async(query, ...params) => {
  const client = await connectionPool.connect();
  try {
      return await client.query(query, ...params);
  } catch (e) {
      console.log(e);  
  } finally {
      client.release();
  }
  
  return null;
};

const executeCachedQuery = async(query, ...params) => {
    const key = query + params.reduce((acc, o) => acc + "-" + o, "");
    if (cache[key]) {
        return cache[key];
    }

    const res = await executeQuery(query, ...params);
    cache[key] = res;

    return res;
}

const clearCache = () => {
    for (var key in cache) { delete cache[key]; }
}

export { executeQuery, executeCachedQuery, clearCache };