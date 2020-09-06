import LRU from 'lru';

const cache: typeof LRU = new LRU(5);

export default cache;