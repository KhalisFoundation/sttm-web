import LRU from 'lru';

const cache: Cache = new LRU(5);

export default cache;