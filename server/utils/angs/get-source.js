
import banidb from '@sttm/banidb';
const { SOURCES } = banidb;

export const getSource = req => SOURCES[req.query.source || 'G'];